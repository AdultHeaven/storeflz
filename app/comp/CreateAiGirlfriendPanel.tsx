'use client';

import React from 'react';
import { SmartLink } from './SmartLink';

const SLUT_ROULETTE_URL =
  'https://t.frtayb.com/384478/153/35662?po=6533&aff_sub5=SF_006OG000004lmDN';

export default function CreateAiGirlfriendPanel() {
  return (
    <div className="aigf-wrapper">
      <SmartLink
        href={SLUT_ROULETTE_URL}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="aigf-card"
      >
        <div className="aigf-glow" />

        {/* Top Header Bar */}
        <div className="aigf-header">
          <div className="aigf-status">
            <span className="aigf-dot" />
            <span>🔥 LIVE RANDOM CAM ROULETTE</span>
          </div>
          <span className="aigf-badge">Omegle Alternative</span>
        </div>

        {/* Main Content Body */}
        <div className="aigf-body">
          <div className="aigf-avatars">
            <div className="aigf-avatar-item aigf-av-1">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="url(#av1-grad)" />
                <path d="M12 13C12 11.8954 12.8954 11 14 11H20C21.1046 11 22 11.8954 22 13V23C22 24.1046 21.1046 25 20 25H14C12.8954 25 12 24.1046 12 23V13Z" fill="#FFF0F5" opacity="0.9" />
                <path d="M22 15L26 12V24L22 21V15Z" fill="#FF2975" />
                <circle cx="17" cy="18" r="3" fill="#FF2975" />
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
                <circle cx="18" cy="18" r="3" fill="#06B6D4" />
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
              Omegle Alternative 🎲
            </h3>
            <p className="aigf-desc">
              Instant 1-on-1 random cam chat with thousands of hot girls online • 100% Free & Uncensored
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="aigf-pills">
          <span className="aigf-pill">🎥 1-on-1 Live Cam</span>
          <span className="aigf-pill">🎲 Random Roulette</span>
          <span className="aigf-pill">⚡ Instant Connect</span>
          <span className="aigf-pill">🔞 100% Uncensored</span>
        </div>

        {/* Action Button */}
        <div className="aigf-cta">
          <div className="aigf-btn">
            <span>Spin & Chat Live</span>
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

