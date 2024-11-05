import React from 'react';
import './motivation.css';

export function Motivation() {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');



  React.useEffect(() => {
    setQuote('If you believe it will work, you\'ll see opportunities. If you believe it won\'t, you will see obstacles.');
    setQuoteAuthor('Wayne Dyer');
}, []);

  return (
    <main>
      <p className='motivation'>
        We know that finishing your to-do lists can be a lengthy and strenuous task. Here at Prioritask, we want to make sure that not only do you have
        the tools to accomplish your tasks with your friends, roommates, family, etc., but also the motivation to help you get things done!
        Check back here any time you need a motivational quote to push you along.
      </p>

      <div id="motivational-quote">
      <p className='quote'>{quote}</p>
      <p className='author'>{quoteAuthor}</p>
      </div>
    </main>
  );
}
