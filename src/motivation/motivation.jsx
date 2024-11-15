import React, { useEffect, useState } from 'react';
import './motivation.css';

export function Motivation() {
  const [quote, setQuote] = useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = useState('unknown');

  //Motivational quote API call
  useEffect(() => {
    fetch('/api/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(data.quoteText || 'No quote available');
        setQuoteAuthor(data.quoteAuthor || 'Unknown');
      })
      .catch(error => console.error('Error fetching quote:', error));
  }, []);

  return (
    <main>
      <p className='motivation'>
        We know that finishing your to-do lists can be a lengthy and strenuous task. Here at Prioritask, we want to make sure that not only do you have
        the tools to accomplish your tasks with your friends, roommates, family, etc., but also the motivation to help you get things done!
        Check back here any time you need a motivational quote to push you along.
      </p>

      <div id="motivational-quote">
        <p className='quote'>"{quote}"</p>
        <p className='author'>- {quoteAuthor}</p>
      </div>
    </main>
  );
}
