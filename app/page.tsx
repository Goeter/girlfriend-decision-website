'use client';

import { useState } from 'react';
import QuestionPage from '@/components/question-page';
import CelebrationPage from '@/components/celebration-page';

export default function Page() {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);

  const handleYes = async () => {
    setAnswered('yes');
    setHasAnswered(true);
    
    // Send email notification
    try {
      await fetch('/api/send-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'yes',
          email: 'jasonvianneys@gmail.com',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleNo = async () => {
    setAnswered('no');
    setHasAnswered(true);
    
    // Send email notification
    try {
      await fetch('/api/send-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'no',
          email: 'jasonvianneys@gmail.com',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  if (hasAnswered && answered === 'yes') {
    return <CelebrationPage />;
  }

  return <QuestionPage onYes={handleYes} onNo={handleNo} />;
}
