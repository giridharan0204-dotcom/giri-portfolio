import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSONAL_INFO,
  SKILLS_DATA,
  PROJECTS_DATA,
  INTERESTS_DATA,
  validateContactForm,
  calculateAcademicMetrics,
  filterProjects,
  HERO_IMAGE,
  ABOUT_IMAGE,
  SKILLS_IMAGE,
  CHARACTER_IMAGE,
} from './portfolioData';

test('Dedicated section images are defined and distinct', () => {
  assert.ok(CHARACTER_IMAGE.includes('giridharan_3d_avatar'));
  assert.ok(ABOUT_IMAGE.includes('giridharan_about'));
  assert.ok(SKILLS_IMAGE.includes('giridharan_skills'));
  assert.notEqual(HERO_IMAGE, ABOUT_IMAGE);
  assert.notEqual(ABOUT_IMAGE, SKILLS_IMAGE);
});

test('Personal info contains accurate brand identity details', () => {
  assert.equal(PERSONAL_INFO.name, 'Giridharan D');
  assert.equal(PERSONAL_INFO.title, 'Aspiring Software Developer');
  assert.equal(PERSONAL_INFO.cgpa, '9.2');
  assert.equal(PERSONAL_INFO.graduationYear, '2029');
  assert.equal(PERSONAL_INFO.currentYear, '02');
  assert.match(PERSONAL_INFO.college, /Sri Krishna College of Engineering and Technology/);
  assert.equal(PERSONAL_INFO.tagline, 'BUILD IDEAS INTO REALITY.');
});

test('Skills data contains Programming, Web Development and Database categories', () => {
  const categories = new Set(SKILLS_DATA.map((s) => s.category));
  assert.ok(categories.has('Programming'));
  assert.ok(categories.has('Web Development'));
  assert.ok(categories.has('Database'));

  const skillNames = SKILLS_DATA.map((s) => s.name);
  assert.ok(skillNames.includes('Java'));
  assert.ok(skillNames.includes('C'));
  assert.ok(skillNames.includes('C++'));
  assert.ok(skillNames.includes('HTML'));
  assert.ok(skillNames.includes('CSS'));
  assert.ok(skillNames.includes('JavaScript'));
  assert.ok(skillNames.includes('SQL'));
  assert.ok(skillNames.includes('Firebase'));
});

test('Projects data contains Meeting Registration, Kerala HealthMap, Udaan and CyberInbox without Campus Connect', () => {
  assert.equal(PROJECTS_DATA.length, 4);
  const titles = PROJECTS_DATA.map((p) => p.title);
  assert.ok(titles.includes('Meeting Registration'));
  assert.ok(titles.includes('Kerala HealthMap'));
  assert.ok(titles.includes('Udaan'));
  assert.ok(titles.includes('CyberInbox'));
  assert.ok(!titles.includes('Campus Connect'));

  const meeting = PROJECTS_DATA.find((p) => p.title === 'Meeting Registration');
  assert.equal(meeting?.liveUrl, 'https://tvk-meeting-registration.vercel.app');
  assert.equal(meeting?.badge, 'Freelancing Project');
  assert.equal(meeting?.category, 'Freelance');

  const kerala = PROJECTS_DATA.find((p) => p.title === 'Kerala HealthMap');
  assert.match(kerala?.badge || '', /College-Level Winning Hackathon Project/i);
  assert.equal(kerala?.category, 'Hackathon');

  const udaan = PROJECTS_DATA.find((p) => p.title === 'Udaan');
  assert.ok(udaan?.liveUrl?.includes('udann.vercel.app'));
  assert.equal(udaan?.category, 'Hackathon');

  const cyber = PROJECTS_DATA.find((p) => p.title === 'CyberInbox');
  assert.equal(cyber?.category, 'Hackathon');
  assert.equal(cyber?.badge, 'Hackathon Project');
});

test('Interests data contains all 4 requested core areas', () => {
  assert.equal(INTERESTS_DATA.length, 4);
  const titles = INTERESTS_DATA.map((i) => i.title);
  assert.ok(titles.includes('CREATING WEBSITES'));
  assert.ok(titles.includes('FREELANCING'));
  assert.ok(titles.includes('LOGICAL PROBLEM SOLVING'));
  assert.ok(titles.includes('EXPLORING NEW TECHNOLOGIES'));
});

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName.length > 0);
  assert.ok(result.errors.email.length > 0);
  assert.ok(result.errors.subject.length > 0);
  assert.ok(result.errors.message.length > 0);
});

test('validateContactForm rejects invalid emails', () => {
  const result = validateContactForm({
    fullName: 'Giridharan D',
    email: 'not-an-email',
    subject: 'Internship Opportunity',
    message: 'Hello, I loved your 3D portfolio and want to connect!',
  });
  assert.equal(result.isValid, false);
  assert.match(result.errors.email, /valid email/i);
});

test('validateContactForm accepts valid submissions', () => {
  const result = validateContactForm({
    fullName: 'Alex Vance',
    email: 'alex@example.com',
    subject: 'Project Collaboration',
    message: 'Hi Giridharan, would love to collaborate on a new creative web project with you!',
  });
  assert.equal(result.isValid, true);
  assert.equal(result.errors.fullName, '');
  assert.equal(result.errors.email, '');
  assert.equal(result.errors.subject, '');
  assert.equal(result.errors.message, '');
});

test('calculateAcademicMetrics returns accurate progress', () => {
  const metrics = calculateAcademicMetrics(2025, 2029, 2, 4);
  assert.equal(metrics.progressPercent, 38);
  assert.equal(metrics.remainingYears, 3);
  assert.equal(metrics.formattedYear, 'Year 2 of 4');
});

test('filterProjects handles category and search queries', () => {
  const hackathonResults = filterProjects(PROJECTS_DATA, 'Hackathon', '');
  assert.equal(hackathonResults.length, 3);
  assert.ok(hackathonResults.some((p) => p.title === 'Kerala HealthMap'));
  assert.ok(hackathonResults.some((p) => p.title === 'Udaan'));
  assert.ok(hackathonResults.some((p) => p.title === 'CyberInbox'));

  const freelanceResults = filterProjects(PROJECTS_DATA, 'Freelance', '');
  assert.equal(freelanceResults.length, 1);
  assert.equal(freelanceResults[0].title, 'Meeting Registration');

  const searchResults = filterProjects(PROJECTS_DATA, 'All', 'Meeting');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].title, 'Meeting Registration');

  const emptyResults = filterProjects(PROJECTS_DATA, 'All', 'NonexistentXYZ');
  assert.equal(emptyResults.length, 0);
});

test('getRevealStyles returns hidden state when isVisible is false', async () => {
  const { getRevealStyles } = await import('./revealUtils');
  const styles = getRevealStyles(false, { scaleFrom: 0.97, translateYPx: 24, delayMs: 150 });
  assert.equal(styles.opacity, 0);
  assert.equal(styles.transform, 'translateY(24px) scale(0.97)');
  assert.equal(styles.transitionDelay, '150ms');
  assert.equal(styles.transitionTimingFunction, 'cubic-bezier(0.16, 1, 0.3, 1)');
});

test('getRevealStyles returns revealed state when isVisible is true', async () => {
  const { getRevealStyles } = await import('./revealUtils');
  const styles = getRevealStyles(true, { scaleFrom: 0.97, translateYPx: 24, delayMs: 0 });
  assert.equal(styles.opacity, 1);
  assert.equal(styles.transform, 'translateY(0px) scale(1)');
});

test('validateObserverThreshold clamps out-of-range thresholds', async () => {
  const { validateObserverThreshold } = await import('./revealUtils');
  assert.equal(validateObserverThreshold(-0.5), 0);
  assert.equal(validateObserverThreshold(1.5), 1);
  assert.deepEqual(validateObserverThreshold([-0.2, 0.5, 1.8]), [0, 0.5, 1]);
});

test('createResumePdfBlob generates a valid binary PDF document', async () => {
  const { createResumePdfBlob } = await import('./generateResumePdf');
  const blob = createResumePdfBlob();
  assert.ok(blob.size > 60000);
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const text = new TextDecoder('latin1').decode(bytes);
  assert.ok(text.startsWith('%PDF-1.7'));
  assert.ok(text.includes('%%EOF'));
});

