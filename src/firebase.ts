import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDocFromServer,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  logEvent,
  type Analytics,
} from 'firebase/analytics';
import firebaseConfig from '../firebase-applet-config.json';
import type { ContactFormData } from './utils/portfolioData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

const resolvedFirebaseConfig = {
  ...firebaseConfig,
  measurementId: firebaseConfig.measurementId || 'G-DQ6PRHQ2J0',
};

export const app: FirebaseApp = initializeApp(resolvedFirebaseConfig);
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth: Auth = getAuth(app);

let analyticsInstance: Analytics | null = null;
const analyticsReady: Promise<Analytics | null> =
  typeof window !== 'undefined'
    ? isAnalyticsSupported()
        .then((supported) => {
          if (supported && resolvedFirebaseConfig.measurementId) {
            analyticsInstance = getAnalytics(app);
          }
          return analyticsInstance;
        })
        .catch(() => null)
    : Promise.resolve(null);

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (analyticsInstance) {
    try {
      logEvent(analyticsInstance, eventName, params);
    } catch {
      // Ignore analytics transport failures
    }
    return;
  }

  void analyticsReady.then((instance) => {
    if (instance) {
      try {
        logEvent(instance, eventName, params);
      } catch {
        // Ignore analytics transport failures
      }
    }
  });
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

if (typeof window !== 'undefined') {
  void testConnection();
}

export async function submitContactMessage(formData: ContactFormData): Promise<string> {
  const fullName = formData.fullName.trim().slice(0, 80);
  const email = formData.email.trim().slice(0, 120);
  const subject = (formData.subject.trim() || 'Portfolio Inquiry').slice(0, 120);
  const message = formData.message.trim().slice(0, 2000);

  const randomSuffix = Math.random().toString(36).slice(2, 10).replace(/[^a-zA-Z0-9]/g, 'x');
  const messageId = `msg_${Date.now()}_${randomSuffix}`;
  const path = `contact_messages/${messageId}`;

  try {
    await setDoc(doc(db, 'contact_messages', messageId), {
      fullName,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
    });
    trackEvent('contact_submit', { subject });
    return messageId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
