'use client';

import React from 'react';
import { SmartLink } from './SmartLink';

const CRACKREVENUE_URL =
  'https://t.vlmai-1.com/384478/9022/0?aff_sub5=SF_006OG000004lmDN';

export default function CreateAiGirlfriendPanel() {
  return (
    <div className="aigf-wrapper">
      <SmartLink
        href={CRACKREVENUE_URL}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="aigf-card"
      >
        <div className="aigf-glow" />

        {/* Top Header Bar */}
        <div className="aigf-header">
          <div className="aigf-status">
            <span className="aigf-dot" />
            <span>AI CHARACTER CREATOR</span>
          </div>
          <span className="aigf-badge">100% Uncensored</span>
        </div>

        {/* Main Content Body */}
        <div className="aigf-body">
          <div className="aigf-avatars">
            <div className="aigf-avatar-item aigf-av-1">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av1-grad)" />
                <path d="M18 10C14.134 10 11 13.134 11 17C11 20.866 14.134 24 18 24C21.866 24 25 20.866 25 17C25 13.134 21.866 10 18 10Z" fill="#FFF0F5" opacity="0.9" />
                <path d="M18 13C16.343 13 15 14.343 15 16C15 17.657 16.343 19 18 19C19.657 19 21 17.657 21 16C21 14.343 19.657 13 18 13Z" fill="#FF2975" />
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
                <path d="M18 10C14.134 10 11 13.134 11 17C11 20.866 14.134 24 18 24C21.866 24 25 20.866 25 17C25 13.134 21.866 10 18 10Z" fill="#F0F9FF" opacity="0.9" />
                <path d="M18 13C16.343 13 15 14.343 15 16C15 17.657 16.343 19 18 19C19.657 19 21 17.657 21 16C21 14.343 19.657 13 18 13Z" fill="#06B6D4" />
                <defs>
                  <linearGradient id="av2-grad" x1="0" y1="0" x2="36" y2="36">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="aigf-avatar-item aigf-av-3">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av3-grad)" />
                <path d="M18 10C14.134 10 11 13.134 11 17C11 20.866 14.134 24 18 24C21.866 24 25 20.866 25 17C25 13.134 21.866 10 18 10Z" fill="#FAF5FF" opacity="0.9" />
                <path d="M18 13C16.343 13 15 14.343 15 16C15 17.657 16.343 19 18 19C19.657 19 21 17.657 21 16C21 14.343 19.657 13 18 13Z" fill="#8B5CF6" />
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
              Create Your AI Girlfriend ✨
            </h3>
            <p className="aigf-desc">
              Custom appearance & voice • 100% Uncensored
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="aigf-pills">
          <span className="aigf-pill">💃 Realistic</span>
          <span className="aigf-pill">🎨 Anime</span>
          <span className="aigf-pill">🗣️ Voice Chat</span>
          <span className="aigf-pill">🔞 Private Chat</span>
        </div>

        {/* Action Button */}
        <div className="aigf-cta">
          <div className="aigf-btn">
            <span>Create AI Girlfriend</span>
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
