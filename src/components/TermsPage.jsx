const SECTIONS = [
  {
    title: '1. Use of the Service',
    content: (
      <div className="space-y-3">
        <p>Make Today Doable is provided as a productivity and wellness support tool. You agree to use the service responsibly and lawfully. You must not:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Abuse or disrupt the platform</li>
          <li>Attempt unauthorized access</li>
          <li>Use the app for illegal activity</li>
          <li>Reverse engineer or exploit the service</li>
        </ul>
      </div>
    ),
  },
  {
    title: '2. No Medical Advice',
    content: (
      <div className="space-y-3">
        <p>Make Today Doable is designed to support organization and motivation. It is not:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Medical advice</li>
          <li>Mental health treatment</li>
          <li>Therapy</li>
          <li>Crisis support</li>
        </ul>
        <p>If you are experiencing a medical or mental health emergency, contact a qualified professional or emergency services.</p>
      </div>
    ),
  },
  {
    title: '3. User Content',
    content: (
      <p>You retain ownership of the content you create within the app, including tasks, routines, and reflections. You are responsible for the content you enter.</p>
    ),
  },
  {
    title: '4. Availability',
    content: (
      <p>We aim to keep the service available and stable, but we do not guarantee uninterrupted access. Features may change, pause, or be removed at any time.</p>
    ),
  },
  {
    title: '5. Limitation of Liability',
    content: (
      <div className="space-y-3">
        <p>Make Today Doable is provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Data loss</li>
          <li>Productivity outcomes</li>
          <li>Missed tasks or reminders</li>
          <li>Indirect or consequential damages</li>
        </ul>
      </div>
    ),
  },
  {
    title: '6. Third-Party Services',
    content: (
      <div className="space-y-3">
        <p>The app may use third-party services such as:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Hosting providers</li>
          <li>Analytics tools</li>
          <li>Authentication providers</li>
          <li>Advertising networks</li>
        </ul>
        <p>Those services may have their own terms and privacy policies.</p>
      </div>
    ),
  },
  {
    title: '7. Intellectual Property',
    content: (
      <p>The branding, design, and software of Make Today Doable are protected by applicable intellectual property laws. You may not copy, resell, or redistribute the platform without permission.</p>
    ),
  },
  {
    title: '8. Termination',
    content: (
      <p>We reserve the right to suspend or terminate access if users violate these Terms.</p>
    ),
  },
  {
    title: '9. Changes to Terms',
    content: (
      <p>These Terms may be updated periodically. Continued use of the platform after updates means you accept the revised Terms.</p>
    ),
  },
  {
    title: '10. Governing Law',
    content: (
      <p>These Terms are governed by the laws applicable in Australia, unless otherwise required by local consumer law.</p>
    ),
  },
]

export function TermsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full">

      <header className="space-y-1 pt-2">
        <p className="text-stone-400 dark:text-stone-500 text-sm">📄 Plain and simple</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 leading-tight tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-stone-400 dark:text-stone-500 text-sm">Last updated: May 8, 2026</p>
      </header>

      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        By using Make Today Doable, you agree to the following Terms and Conditions.
      </p>

      <div className="space-y-6 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        {SECTIONS.map(({ title, content }) => (
          <section key={title} className="space-y-2">
            <h2 className="font-semibold text-stone-800 dark:text-stone-100 text-base">{title}</h2>
            {content}
          </section>
        ))}

        <section className="space-y-2">
          <h2 className="font-semibold text-stone-800 dark:text-stone-100 text-base">11. Contact</h2>
          <p>For questions regarding these Terms, contact:</p>
          <p className="text-stone-500 dark:text-stone-400">
            Make Today Doable<br />
            <a href="mailto:emc.ai.studio@gmail.com" className="text-sage-600 dark:text-sage-400 hover:underline">
              emc.ai.studio@gmail.com
            </a>
          </p>
        </section>
      </div>

      <p className="text-center text-xs text-stone-300 dark:text-stone-600 pb-4">
        Small steps, fair terms. 🌱
      </p>
    </div>
  )
}
