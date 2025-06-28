export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Test Page Working! ✅
        </h1>
        <p className="text-lg text-blue-600">
          If you can see this, the basic setup is working correctly.
        </p>
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700">
            This is a simple test to verify that:
          </p>
          <ul className="text-left mt-2 text-gray-600">
            <li>• Next.js is running properly</li>
            <li>• Tailwind CSS is working</li>
            <li>• TypeScript compilation is successful</li>
            <li>• Basic styling is applied</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 