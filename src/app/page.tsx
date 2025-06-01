import BrowserbaseViewer from '@/components/BrowserbaseViewer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">n8n Browserbase Integration</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://n8n.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                n8n Docs
              </a>
              <a
                href="https://www.browserbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Browserbase
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browser Automation for n8n Workflows
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Control web browsers programmatically through n8n workflows. Automate form filling,
            data extraction, and complex web interactions with our AI-powered assistant.
          </p>
        </div>

        <BrowserbaseViewer />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">🤖 AI-Powered</h3>
            <p className="text-gray-600 text-sm">
              Intelligent browser automation that understands context and adapts to changes
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 n8n Integration</h3>
            <p className="text-gray-600 text-sm">
              Seamlessly integrates with n8n workflows for complex automation pipelines
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">🔒 Secure & Isolated</h3>
            <p className="text-gray-600 text-sm">
              Each session runs in an isolated environment with enterprise-grade security
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-24 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            Built with n8n and Browserbase for intelligent workflow automation
          </p>
        </div>
      </footer>
    </div>
  );
}
