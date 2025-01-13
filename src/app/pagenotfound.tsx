import Link from 'next/link';
import React from 'react';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="text-lg mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Go to Homepage
        </a>
      </Link>
    </div>
  );
}
