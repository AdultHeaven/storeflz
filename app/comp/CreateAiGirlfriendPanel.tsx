'use client';

import React from 'react';
import { SmartLink } from './SmartLink';

const AI_GIRLFRIEND_URL =
  'https://t.vlmai-5.com/384478/9022/0?aff_sub5=SF_006OG000004lmDN';

export default function CreateAiGirlfriendPanel() {
  return (
    <div className="aigf-wrapper">
      <SmartLink
        href={AI_GIRLFRIEND_URL}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="aigf-card"
      >
        <div className="aigf-glow" />

        {/* Top Header Bar */}
        <div className="aigf-header">
          <div className="aigf-status">
            <span className="aigf-dot" />
            <span>🔥 CREATE AI COMPANION</span>
          </div>
          <span className="aigf-badge">100% Uncensored</span>
        </div>

        {/* Main Content Body */}
        <div className="aigf-body">
          <div className="aigf-avatars">
            <div className="aigf-avatar-item aigf-av-1">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av1-grad)" />
                <path d="M12 14C12 11.5 14 9.5 18 9.5C22 9.5 24 11.5 24 14C24 17.5 19.5 20.5 18 25C16.5 20.5 12 17.5 12 14Z" fill="#FFF0F5" opacity="0.9" />
                <circle cx="18" cy="14" r="2.5" fill="#FF2975" />
                <defs>
                  <linearGradient id="av1-grad" x1="0" y1="0" x2="36" y2="36">
                    <stop stopColor="#FF2975" />
                    <stop offset="1" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="aigf-avatar-item aigf-av-2">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av2-grad)" />
                <circle cx="18" cy="18" r="7" stroke="#FFF" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="18" cy="18" r="3" fill="#EC4899" />
                <defs>
                  <linearGradient id="av2-grad" x1="0" y1="0" x2="36" y2="36">
                    <stop stopColor="#EC4899" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="aigf-avatar-item aigf-av-3">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av3-grad)" />
                <path d="M18 11C15 11 12 13 12 16.5C12 21 18 25 18 25C18 25 24 21 24 16.5C24 13 21 11 18 11Z" fill="#FF2975" opacity="0.9" />
                <defs>
                  <linearGradient id="av3-grad" x1="0" y1="0" x2="36" y2="36">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#F43F5E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="aigf-details">
            <h3 className="aigf-title">
              Create Your Dream AI Girlfriend <span className="aigf-sparkle">✨</span>
            </h3>
            <p className="aigf-desc">
              Design your custom realistic AI companion • Voice chat, spicy selfies, zero filter & 100% Free
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="aigf-pills">
          <span className="aigf-pill">✨ Custom Appearance</span>
          <span className="aigf-pill">🎙️ Voice Chat</span>
          <span className="aigf-pill">🔞 Zero Filter & NSFW</span>
          <span className="aigf-pill">📸 Spicy Photos</span>
        </div>

        {/* Action Button */}
        <div className="aigf-cta">
          <div className="aigf-btn">
            <span>Create AI Girlfriend Free</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </SmartLink>
    </div>
  );
}

