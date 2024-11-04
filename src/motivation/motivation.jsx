import React from 'react';
import './motivation.css';

export function Motivation() {
  return (
    <main>
      <p>
        We know that finishing your to-do lists can be a lengthy and strenuous task. Here at Prioritask, we want to make sure that not only do you have
        the tools to accomplish your tasks with your friends, roommates, family, etc., but also the motivation to help you get things done!
        Check back here any time you need a motivational quote to push you along.
      </p>

      <div id="motivational-quote">
        <blockquote>
          "If you believe it will work, you'll see opportunities. If you believe it won't, you will see obstacles."
        </blockquote>
        <div>- Wayne Dyer -</div>
      </div>
    </main>
  );
}
