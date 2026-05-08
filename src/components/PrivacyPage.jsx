const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: (
      <div className="space-y-3">
        <p className="font-medium text-stone-700">Information You Enter</p>
        <p>Make Today Doable may store information you voluntarily enter into the app, such as:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Daily tasks</li>
          <li>Routines</li>
          <li>Reflections or notes</li>
          <li>Preferences and settings</li>
        </ul>
        <p>Depending on the version of the app, this information may be stored:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Locally on your device/browser</li>
          <li>Or securely in cloud storage if account features are introduced later</li>
        </ul>
      </div>
    ),
  },
  {
    title: '2. Local Storage',
    content: (
      <div className="space-y-3">
        <p>The current version of the app uses browser local storage to save your tasks and progress. This means:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Your data stays on your device</li>
          <li>No account is required</li>
          <li>Data may be lost if browser storage is cleared</li>
        </ul>
      </div>
    ),
  },
  {
    title: '3. Analytics',
    content: (
      <div className="space-y-3">
        <p>We may use basic analytics tools to understand app usage, feature popularity, errors and crashes, and general performance. Analytics data does not intentionally identify you personally. Examples may include:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Device type</li>
          <li>Browser type</li>
          <li>Pages visited</li>
          <li>Session duration</li>
        </ul>
      </div>
    ),
  },
  {
    title: '4. Cookies',
    content: (
      <p>The website may use cookies or similar technologies to remember preferences, improve performance, and understand usage patterns. You can disable cookies through your browser settings.</p>
    ),
  },
  {
    title: '5. Advertising',
    content: (
      <div className="space-y-3">
        <p>Currently, Make Today Doable aims to provide a calm and distraction-free experience. If advertising is added in the future:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Ads may be provided by third-party networks</li>
          <li>Those providers may use cookies or device identifiers</li>
          <li>Personalized advertising settings will depend on platform permissions and applicable laws</li>
        </ul>
      </div>
    ),
  },
  {
    title: '6. Data Sharing',
    content: (
      <div className="space-y-3">
        <p>We do not sell your personal information. We may share limited information only when necessary to:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Operate the service</li>
          <li>Comply with legal obligations</li>
          <li>Protect the safety and integrity of the platform</li>
        </ul>
      </div>
    ),
  },
  {
    title: '7. Data Security',
    content: (
      <p>Reasonable steps are taken to protect information and maintain platform security. However, no online platform can guarantee absolute security.</p>
    ),
  },
  {
    title: '8. Children\'s Privacy',
    content: (
      <p>Make Today Doable is not directed toward children under 13 years of age. We do not knowingly collect personal information from children.</p>
    ),
  },
  {
    title: '9. Your Rights',
    content: (
      <div className="space-y-3">
        <p>Depending on your location, you may have rights regarding your personal information, including:</p>
        <ul className="space-y-1 pl-4 list-disc text-stone-500">
          <li>Accessing your data</li>
          <li>Requesting deletion</li>
          <li>Requesting correction</li>
        </ul>
        <p>If account systems are introduced later, contact options for these requests will also be provided.</p>
      </div>
    ),
  },
  {
    title: '10. Changes to This Policy',
    content: (
      <p>This Privacy Policy may be updated from time to time. Changes become effective once posted on the website or app.</p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full">

      <header className="space-y-1 pt-2">
        <p className="text-stone-400 text-sm">🔒 Your data stays yours</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-stone-400 text-sm">Last updated: May 8, 2026</p>
      </header>

      <p className="text-sm text-stone-600 leading-relaxed">
        Welcome to Make Today Doable, a calm and simple daily planning app designed to help users
        focus on small, manageable tasks without pressure or overwhelm. This Privacy Policy explains
        how information is handled when you use the app and website.
      </p>

      <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
        {SECTIONS.map(({ title, content }) => (
          <section key={title} className="space-y-2">
            <h2 className="font-semibold text-stone-800 text-base">{title}</h2>
            {content}
          </section>
        ))}

        <section className="space-y-2">
          <h2 className="font-semibold text-stone-800 text-base">11. Contact</h2>
          <p>For questions regarding this Privacy Policy, contact:</p>
          <p className="text-stone-500">
            Make Today Doable<br />
            <a href="mailto:emc.ai.studio@gmail.com" className="text-sage-600 hover:underline">
              emc.ai.studio@gmail.com
            </a>
          </p>
        </section>
      </div>

      <p className="text-center text-xs text-stone-300 pb-4">
        Your mind is your own. So is your data. 🌱
      </p>
    </div>
  )
}
