import React, { useState, useEffect, useCallback } from 'react';
import { generatePlaceholderImage } from './wordsData';

// Cache global para imagens
const imageCache = new Map();
const preloadedImages = new Set();

const WordImage = ({ word, image, alt, className, style, id, preloadNext = [] }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Função otimizada para carregar imagem
  const loadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      // Verificar cache primeiro
      if (imageCache.has(src)) {
        resolve(imageCache.get(src));
        return;
      }

      const img = new Image();
      let progressTimer;

      // Simular progresso para melhor UX
      const simulateProgress = () => {
        setLoadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      };

      progressTimer = setInterval(simulateProgress, 100);

      img.onload = () => {
        clearInterval(progressTimer);
        setLoadProgress(100);
        imageCache.set(src, src);
        resolve(src);
      };

      img.onerror = () => {
        clearInterval(progressTimer);
        reject(new Error(`Failed to load ${src}`));
      };

      img.src = src;
    });
  }, []);

  // Preload próximas imagens em background
  const preloadImages = useCallback((imageUrls) => {
    imageUrls.forEach(url => {
      if (!preloadedImages.has(url) && !imageCache.has(url)) {
        preloadedImages.add(url);
        const img = new Image();
        img.onload = () => imageCache.set(url, url);
        img.onerror = () => {
          // Se falhar, gera placeholder em cache
          const placeholder = generatePlaceholderImage(url.split('/').pop().replace('.svg', ''), 300, 300);
          imageCache.set(url, placeholder);
        };
        img.src = url;
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setLoadProgress(0);
    
    loadImage(image)
      .then((src) => {
        setImageSrc(src);
        setImageError(false);
        setIsLoading(false);
        
        // Preload próximas imagens após carregar a atual
        if (preloadNext.length > 0) {
          setTimeout(() => preloadImages(preloadNext), 200);
        }
      })
      .catch(() => {
        console.warn(`Imagem não encontrada: ${image}, gerando placeholder para: ${word}`);
        const placeholderSrc = generatePlaceholderImage(word, 300, 300);
        setImageSrc(placeholderSrc);
        setImageError(true);
        setIsLoading(false);
        
        // Cache do placeholder
        imageCache.set(image, placeholderSrc);
      });
  }, [word, image, loadImage, preloadNext, preloadImages]);

  if (isLoading) {
    return (
      <div 
        className={className} 
        style={{
          ...style,
          width: '300px',
          height: '300px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '15px',
          border: '2px solid #e9ecef',
          position: 'relative',
          overflow: 'hidden'
        }}
        id={id}
      >
        {/* Skeleton loading animation */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(102,126,234,0.1), transparent)',
          backgroundSize: '200px 100%',
          animation: 'shimmer 1.5s infinite'
        }} />
        
        {/* Progress indicator */}
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '15px',
          opacity: 0.6,
          animation: 'pulse 1s infinite alternate'
        }}>
          🖼️
        </div>
        
        {/* Progress bar */}
        <div style={{
          width: '80%',
          height: '6px',
          backgroundColor: '#e9ecef',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '8px'
        }}>
          <div style={{
            width: `${loadProgress}%`,
            height: '100%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            transition: 'width 0.3s ease',
            borderRadius: '3px'
          }} />
        </div>
        
        <span style={{ 
          color: '#6c757d', 
          fontSize: '13px',
          fontWeight: '500'
        }}>
          {loadProgress < 100 ? `${Math.round(loadProgress)}%` : 'Quase pronto...'}
        </span>

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt || `Image for ${word}`}
      className={className}
      style={{
        ...style,
        width: '300px',
        height: '300px',
        objectFit: 'contain',
        borderRadius: '15px',
        border: imageError ? '2px solid #ffc107' : '2px solid #e9ecef',
        backgroundColor: '#f8f9fa',
        transition: 'all 0.3s ease',
        boxShadow: imageError ? '0 4px 12px rgba(255,193,7,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
      }}
      id={id}
      loading="lazy"
      onError={() => {
        if (!imageError) {
          setImageError(true);
          const placeholderSrc = generatePlaceholderImage(word, 300, 300);
          setImageSrc(placeholderSrc);
        }
      }}
    />
  );
};

export default WordImage;