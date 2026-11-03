import React from 'react';
import { submitForm } from '../lib/api.js';
import { Link } from './UI.jsx';
import {
  MAX_EXPERIENCE_ENTRIES, RESUME_EXTENSIONS, RESUME_MAX_BYTES,
  validateEmail, validateExperienceEntry, validateMessage, validateName, validateOrganization, validatePhone, validateResumeFile, validateYears,
} from '../lib/validate.js';

const CONSENT_ERROR = 'Please tick the box so we can contact you about this.';
const ANALYTICS = (detail) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail }));

/** Form-wide validation state: errors are shown per field after the user leaves it, and everything is re-checked on submit. */
function useValidation(rules, getExtra) {
  const [errors, setErrors] = React.useState({});
  const formRef = React.useRef(null);
  const read = () => {
    const form = new FormData(formRef.current);
    const values = Object.fromEntries(form.entries());
    values.consent = form.get('consent') === 'true';
    return values;
  };
  const check = (name) => {
    const message = rules(read(), getExtra?.())[name] || '';
    setErrors((current) => (current[name] === message ? current : { ...current, [name]: message }));
    return message;
  };
  const validateAll = () => {
    const next = rules(read(), getExtra?.());
    setErrors(next);
    const first = Object.keys(next).find((name) => next[name]);
    if (first) formRef.current.querySelector(`[name="${first}"], [data-field="${first}"]`)?.focus();
    return !first;
  };
  const events = { onBlur: (event) => event.target.name && check(event.target.name), onChange: (event) => { if (errors[event.target.name]) check(event.target.name); } };
  return { errors, setErrors, formRef, read, check, validateAll, events };
}

function Field({ label, optional, error, wide, children }) {
  return <label className={`${wide ? 'form-wide' : ''} ${error ? 'has-error' : ''}`}>
    {label} {optional && <span className="optional">(optional)</span>}
    {children}
    {error && <span className="field-error" role="alert">{error}</span>}
  </label>;
}

function Consent({ error, children }) {
  return <>
    <label className={`consent ${error ? 'has-error' : ''}`}><input type="checkbox" name="consent" value="true" aria-invalid={Boolean(error)} /><span>{children}</span></label>
    {error && <span className="field-error consent-error" role="alert">{error}</span>}
  </>;
}

function Status({ status }) {
  return <p className={`form-status ${status.kind}`} aria-live="polite">{status.text}</p>;
}

const contactRules = (values) => ({
  name: validateName(values.name),
  email: validateEmail(values.email),
  organization: validateOrganization(values.organization),
  message: validateMessage(values.message),
  consent: values.consent ? '' : CONSENT_ERROR,
});

/** Reasons for getting in touch; the chosen one is sent as the inquiry type and tunes the form's wording. */
export const contactIntents = [
  { id: 'business', label: 'Business inquiry', hint: 'Tell us about the challenge or outcome you have in mind.', placeholder: 'What would you like to explore together?' },
  { id: 'partnership', label: 'Partnership', hint: 'Tell us who you are and how you imagine working together.', placeholder: 'How could we work together?' },
  { id: 'impact', label: 'Impact programme', hint: 'Tell us about your business or NGO and the support that would help most.', placeholder: 'Tell us about your organization and what would help' },
  { id: 'careers', label: 'Careers', hint: 'Tell us what you would bring to Scalric.', placeholder: 'What would you bring to the team?' },
];

function FloatField({ label, optional, error, wide, children }) {
  return <label className={`ct-field${wide ? ' form-wide' : ''}${error ? ' has-error' : ''}`}>
    {children}
    <span className="ct-label">{label}{optional && ' (optional)'}</span>
    <i className="ct-line" aria-hidden="true" />
    {error && <span className="field-error" role="alert">{error}</span>}
  </label>;
}

export function ContactForm({ inquiryType = 'business', onTypeChange }) {
  const [status, setStatus] = React.useState({ kind: '', text: '' });
  const [sending, setSending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { errors, formRef, read, validateAll, events } = useValidation(contactRules);
  const intent = contactIntents.find((item) => item.id === inquiryType) || contactIntents[0];

  const recalc = () => {
    const values = read();
    const steps = [Boolean(values.name?.trim()), /\S+@\S+\.\S+/.test(values.email || ''), (values.message || '').trim().length >= 10, values.consent];
    setProgress(steps.filter(Boolean).length / steps.length);
    setCount((values.message || '').length);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateAll()) { setStatus({ kind: 'error', text: 'Please fix the highlighted fields.' }); return; }
    setSending(true); setStatus({ kind: '', text: '' });
    try {
      const result = await submitForm('/api/contact', read());
      setStatus({ kind: 'success', text: result.message });
      ANALYTICS({ event: 'contact_form_submit' });
      setDone(true);
    } catch (error) { setStatus({ kind: 'error', text: error.message }); }
    finally { setSending(false); }
  }

  if (done) {
    return <div className="ct-done" role="status">
      <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l8 8 14-16" /></svg>
      <h3>Thank you, your note is on its way</h3>
      <p>{status.text || 'A member of the team will read it and reply to start the conversation.'}</p>
      <button type="button" className="ct-again" onClick={() => { setDone(false); setProgress(0); setCount(0); setStatus({ kind: '', text: '' }); }}>Send another message</button>
    </div>;
  }

  return <form className="contact-form ct-form" ref={formRef} onSubmit={handleSubmit} noValidate {...events} onChange={(event) => { events.onChange(event); recalc(); }} onInput={recalc}>
    <p className="ct-hint" key={intent.id}>{intent.hint}</p>
    <div className="form-grid">
      <FloatField label="Your name" error={errors.name}><input name="name" autoComplete="name" maxLength="120" placeholder=" " aria-invalid={Boolean(errors.name)} /></FloatField>
      <FloatField label="Work email" error={errors.email}><input name="email" type="email" autoComplete="email" maxLength="254" placeholder=" " aria-invalid={Boolean(errors.email)} /></FloatField>
      <label className="ct-field form-wide ct-select"><select name="inquiryType" value={inquiryType} onChange={(event) => onTypeChange?.(event.target.value)}>{contactIntents.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><span className="ct-label">What are you reaching out about?</span><i className="ct-line" aria-hidden="true" /></label>
      <FloatField label="Organization" optional wide error={errors.organization}><input name="organization" autoComplete="organization" maxLength="160" placeholder=" " aria-invalid={Boolean(errors.organization)} /></FloatField>
      <FloatField label={intent.placeholder} wide error={errors.message}><textarea name="message" maxLength="5000" rows="5" placeholder=" " aria-invalid={Boolean(errors.message)} /><em className="ct-count">{count}/5000</em></FloatField>
    </div>
    <Consent error={errors.consent}>I agree that Scalric may contact me about this request.</Consent>
    <button className="btn-talk ct-send" disabled={sending}><span>{sending ? 'Sending…' : 'Send your message'}</span></button>
    <Status status={status} />
  </form>;
}

const thisMonth = () => new Date().toISOString().slice(0, 7);
const emptyEntry = () => ({ company: '', title: '', from: '', to: '', current: false });

const applyRules = (values, extra = {}) => {
  const entryErrors = (extra.experience || []).map(validateExperienceEntry);
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    experienceYears: validateYears(values.experienceYears),
    experience: entryErrors.find(Boolean) ? 'Complete or remove the highlighted experience entries.' : '',
    resume: validateResumeFile(extra.resume),
    message: validateMessage(values.message, 'Your note'),
    consent: values.consent ? '' : CONSENT_ERROR,
  };
};

async function toBase64(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return btoa(binary);
}

export function RoleApplyForm({ role }) {
  const [status, setStatus] = React.useState({ kind: '', text: '' });
  const [sending, setSending] = React.useState(false);
  const [entries, setEntries] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const [done, setDone] = React.useState(null);
  const successRef = React.useRef(null);
  const fileInput = React.useRef(null);
  const extraRef = React.useRef({});
  extraRef.current = { experience: entries, resume: file };
  const { errors, setErrors, formRef, read, validateAll, events } = useValidation(applyRules, () => extraRef.current);
  const entryErrors = touched ? entries.map(validateExperienceEntry) : [];

  const updateEntry = (index, changes) => setEntries((list) => list.map((entry, position) => (position === index ? { ...entry, ...changes } : entry)));
  const pickFile = (event) => {
    const picked = event.target.files?.[0] || null;
    setFile(picked);
    setErrors((current) => ({ ...current, resume: picked ? validateResumeFile(picked) : '' }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);
    if (!validateAll()) { setStatus({ kind: 'error', text: 'Please fix the highlighted fields.' }); return; }
    setSending(true); setStatus({ kind: '', text: '' });
    try {
      const values = read();
      const result = await submitForm('/api/contact', {
        ...values, inquiryType: 'careers', role: role.slug, experience: entries,
        resume: { name: file.name, data: await toBase64(file) },
      });
      setDone({ name: String(values.name || '').trim().split(/\s+/)[0], email: String(values.email || '').trim() });
      setStatus({ kind: '', text: '' });
      window.setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      ANALYTICS({ event: 'careers_application_submit', slug: role.slug });
      formRef.current.reset(); setEntries([]); setFile(null); setTouched(false); setErrors({});
    } catch (error) { setStatus({ kind: 'error', text: error.message }); }
    finally { setSending(false); }
  }

  if (done) return <div className="apply-success" ref={successRef} role="status" aria-live="polite">
    <span className="apply-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l8 8 14-16" /></svg></span>
    <h3>Thank you, {done.name}!</h3>
    <p className="apply-lead">Your application for <b>{role.title}</b> has been submitted successfully.</p>
    <p>We’ve received your details and resume, and our team will review your application carefully. If it’s a good match, we’ll contact you on <b>{done.email}</b> or by phone.</p>
    <ol className="apply-steps">
      <li><b>We review</b><span>The team looks at your experience and resume.</span></li>
      <li><b>We get in touch</b><span>If it’s a match, we’ll reach out by email or phone to talk next steps.</span></li>
      <li><b>You hear from us</b><span>We’ll share what comes next as soon as we’ve reviewed your application.</span></li>
    </ol>
    <div className="apply-actions"><Link href="/careers/openings" className="button button-green">Browse more openings</Link><Link href="/careers" className="button button-green">Back to careers</Link></div>
  </div>;

  return <form className="contact-form role-apply-form" ref={formRef} onSubmit={handleSubmit} noValidate {...events}>
    <div className="form-grid">
      <Field label="Your name" error={errors.name}><input name="name" autoComplete="name" maxLength="120" placeholder="Full name" aria-invalid={Boolean(errors.name)} /></Field>
      <Field label="Email" error={errors.email}><input name="email" type="email" autoComplete="email" maxLength="254" placeholder="you@email.com" aria-invalid={Boolean(errors.email)} /></Field>
      <Field label="Contact number" error={errors.phone}><input name="phone" type="tel" autoComplete="tel" maxLength="20" placeholder="+91 98765 43210" aria-invalid={Boolean(errors.phone)} /></Field>
      <Field label="Total experience (years)" error={errors.experienceYears}><input name="experienceYears" type="number" inputMode="decimal" min="0" max="60" step="0.5" placeholder="e.g. 4.5 (0 if fresher)" aria-invalid={Boolean(errors.experienceYears)} /></Field>

      <div className="form-wide exp-block" data-field="experience" tabIndex="-1">
        <div className="exp-head"><span>Work experience <span className="optional">(optional)</span></span>
          <button type="button" className="exp-add" onClick={() => setEntries((list) => [...list, emptyEntry()])} disabled={entries.length >= MAX_EXPERIENCE_ENTRIES}>+ Add experience</button></div>
        {!entries.length && <p className="exp-empty">Add your previous roles so we can see your journey. Up to {MAX_EXPERIENCE_ENTRIES} entries.</p>}
        {entries.map((entry, index) => <fieldset key={index} className={`exp-entry ${entryErrors[index] ? 'has-error' : ''}`}>
          <legend>Experience {index + 1}</legend>
          <div className="exp-grid">
            <label>Company<input value={entry.company} maxLength="120" onChange={(event) => updateEntry(index, { company: event.target.value })} placeholder="Company name" /></label>
            <label>Job title<input value={entry.title} maxLength="120" onChange={(event) => updateEntry(index, { title: event.target.value })} placeholder="Your role" /></label>
            <label>From<input type="month" value={entry.from} max={thisMonth()} onChange={(event) => updateEntry(index, { from: event.target.value })} /></label>
            <label>To<input type="month" value={entry.current ? '' : entry.to} min={entry.from || undefined} max={thisMonth()} disabled={entry.current} onChange={(event) => updateEntry(index, { to: event.target.value })} /></label>
          </div>
          <div className="exp-foot">
            <label className="exp-current"><input type="checkbox" checked={entry.current} onChange={(event) => updateEntry(index, { current: event.target.checked, to: '' })} /> I currently work here</label>
            <button type="button" className="exp-remove" onClick={() => setEntries((list) => list.filter((_, position) => position !== index))}>Remove</button>
          </div>
          {entryErrors[index] && <span className="field-error" role="alert">{entryErrors[index]}</span>}
        </fieldset>)}
      </div>

      <div className={`form-wide resume-field ${errors.resume ? 'has-error' : ''}`}>
        <span className="resume-label">Resume</span>
        <input ref={fileInput} id="resume-input" name="resume" type="file" accept={RESUME_EXTENSIONS.map((extension) => `.${extension}`).join(',')} onChange={pickFile} className="resume-input" aria-invalid={Boolean(errors.resume)} />
        <div className="resume-drop">
          <label htmlFor="resume-input" className="resume-pick">{file ? 'Change file' : 'Choose file'}</label>
          <span className="resume-name">{file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : `PDF, DOC or DOCX, up to ${RESUME_MAX_BYTES / 1024 / 1024} MB`}</span>
          {file && <button type="button" className="exp-remove" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ''; setErrors((current) => ({ ...current, resume: '' })); }}>Remove</button>}
        </div>
        {errors.resume && <span className="field-error" role="alert">{errors.resume}</span>}
      </div>

      <Field label="Why are you a great fit?" wide error={errors.message}><textarea name="message" maxLength="5000" rows="5" placeholder="Tell us what draws you to this role and what you would bring." aria-invalid={Boolean(errors.message)} /></Field>
    </div>
    <Consent error={errors.consent}>I agree that Scalric may contact me about this application.</Consent>
    <button className="button button-green form-submit" disabled={sending}>{sending ? 'Sending…' : 'Submit application'}</button>
    <Status status={status} />
  </form>;
}

const impactRules = (values) => ({
  organization: validateOrganization(values.organization, { required: true }),
  contactName: validateName(values.contactName, 'Your name'),
  email: validateEmail(values.email),
  organizationType: values.organizationType ? '' : 'Choose business or NGO.',
  need: validateMessage(values.need, 'This'),
  consent: values.consent ? '' : CONSENT_ERROR,
});

export function ImpactForm() {
  const [status, setStatus] = React.useState({ kind: '', text: '' });
  const [sending, setSending] = React.useState(false);
  const { errors, formRef, read, validateAll, events } = useValidation(impactRules);

  // The niche boxes on the Impact page pre-select Business or NGO when someone taps their button
  React.useEffect(() => {
    const pick = (event) => {
      const radio = formRef.current?.querySelector(`input[name="organizationType"][value="${event.detail?.type}"]`);
      if (radio) radio.checked = true;
    };
    window.addEventListener('scalric:impact-type', pick);
    return () => window.removeEventListener('scalric:impact-type', pick);
  }, [formRef]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateAll()) { setStatus({ kind: 'error', text: 'Please fix the highlighted fields' }); return; }
    setSending(true); setStatus({ kind: '', text: '' });
    try {
      const result = await submitForm('/api/impact/applications', read());
      setStatus({ kind: 'success', text: result.message });
      formRef.current.reset();
    } catch (error) { setStatus({ kind: 'error', text: error.message }); }
    finally { setSending(false); }
  }
  return <form className="contact-form impact-form" ref={formRef} onSubmit={handleSubmit} noValidate {...events}>
    <div className="form-grid">
      <Field label="Organization name" error={errors.organization}><input name="organization" maxLength="160" placeholder="Your organization" aria-invalid={Boolean(errors.organization)} /></Field>
      <Field label="Your name" error={errors.contactName}><input name="contactName" maxLength="120" placeholder="Name" aria-invalid={Boolean(errors.contactName)} /></Field>
      <Field label="Email address" error={errors.email}><input name="email" type="email" maxLength="254" placeholder="you@organization.org" aria-invalid={Boolean(errors.email)} /></Field>
      <fieldset className="form-type"><legend>Organization type</legend><label><input type="radio" name="organizationType" value="business" /> Business</label><label><input type="radio" name="organizationType" value="ngo" /> NGO</label>
        {errors.organizationType && <span className="field-error" role="alert">{errors.organizationType}</span>}</fieldset>
      <Field label="What technology support would help?" wide error={errors.need}><textarea name="need" maxLength="5000" rows="4" placeholder="Tell us about the challenge you are working on" aria-invalid={Boolean(errors.need)} /></Field>
    </div>
    <Consent error={errors.consent}>I agree that Scalric may contact me about this request</Consent>
    <button className="button button-green form-submit" disabled={sending}>{sending ? 'Sending…' : 'Share your need'}</button>
    <Status status={status} />
  </form>;
}
