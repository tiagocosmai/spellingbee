import React, { useState, useEffect } from 'react';
import { generatePlaceholderImage } from './wordsData';

const WordImage = ({ word, image, alt, className, style, id }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Primeiro tenta carregar a imagem local
    const img = new Image();
    img.onload = () => {
      setImageSrc(image);
      setImageError(false);
      setIsLoading(false);
    };
    img.onerror = () => {
      // Se a imagem local não existir, gera um placeholder
      setImageError(true);
      const placeholderSrc = generatePlaceholderImage(word, 400, 300);
      setImageSrc(placeholderSrc);
      setIsLoading(false);
    };
    
    // Adiciona um timeout para fallback mais rápido
    const timeout = setTimeout(() => {
      if (isLoading) {
        setImageError(true);
        const placeholderSrc = generatePlaceholderImage(word, 400, 300);
        setImageSrc(placeholderSrc);
        setIsLoading(false);
      }
    }, 1000);
    
    img.src = image;
    
    return () => clearTimeout(timeout);
  }, [word, image, isLoading]);

  if (isLoading) {
    return (
      <div 
        className={className} 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          minHeight: '200px',
          borderRadius: '8px'
        }}
        id={id}
      >
        <div style={{ textAlign: 'center', color: '#666' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🖼️</div>
          <div>Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt || `Image for ${word}`}
      className={className}
      style={style}
      id={id}
      loading="lazy"
      onError={() => {
        if (!imageError) {
          setImageError(true);
          const placeholderSrc = generatePlaceholderImage(word, 400, 300);
          setImageSrc(placeholderSrc);
        }
      }}
    />
  );
};

export default WordImage;
