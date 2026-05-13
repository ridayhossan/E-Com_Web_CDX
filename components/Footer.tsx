export default function Footer({ settings }: { settings: any }) {
  return <footer className="mt-20 border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
      <div><h3 className="text-xl font-black">{settings.siteName}</h3><p className="mt-3 text-slate-600">{settings.footerText}</p></div>
      <div><h4 className="font-bold">Contact</h4><p className="mt-3 text-slate-600">{settings.contactEmail}<br />{settings.contactPhone}</p></div>
      <div><h4 className="font-bold">Visit</h4><p className="mt-3 text-slate-600">{settings.contactAddress}</p></div>
    </div>
  </footer>;
}
