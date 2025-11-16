
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { generateModelImage } from './services/geminiService';
import { ImageFile, GenerationOptions } from './types';
import { AboutModal } from './components/AboutModal';

const modelSizeOptions = ["P", "M", "G", "Plus Size"];
const backgroundOptions = [
  "Fundo suave",
  "Fundo natural",
  "Fundo de loja ou estúdio",
  "Urbano/Cidade",
  "Interior Minimalista",
  "Praia/Litoral"
];
const modelAppearanceOptions = [
  "Modelo 1 - feminina morena",
  "Modelo 2 - feminina loira",
  "Modelo 3 - feminina negra",
  "Modelo 4 - feminina asiática",
  "Modelo 5 - masculino branco",
  "Modelo 6 - masculino negro",
  "Modelo 7 - masculino asiático",
  "Modelo personalizado (enviar referência facial)"
];
const footwearOptions = [
  "Nenhum (foco na roupa)",
  "Tênis",
  "Sapatos Sociais",
  "Sandálias",
  "Botas",
  "Salto Alto"
];
const outputFormatOptions = [
  "Instagram Post (1:1)",
  "Stories / TikTok (9:16)",
];
const poseOptions = [
    "Pose padrão",
    "Pose em movimento",
    "Pose sentada",
    "Close-up no look"
];

// Base64 for the background logo
const logoBase64 = "data:image/jpeg;base64,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";


const App: React.FC = () => {
  const [clothingImage, setClothingImage] = useState<ImageFile>(null);
  const [faceReferenceImage, setFaceReferenceImage] = useState<ImageFile>(null);
  const [options, setOptions] = useState<GenerationOptions>({
    modelSize: 'M',
    backgroundType: 'Fundo suave',
    modelAppearance: 'Modelo 1 - feminina morena',
    outputFormat: 'Instagram Post (1:1)',
    footwear: 'Nenhum (foco na roupa)',
    numberOfImages: 1,
    pose: 'Pose padrão',
  });
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [lastGenerationTime, setLastGenerationTime] = useState<number | null>(null);

  const runGeneration = useCallback(async (opts: GenerationOptions) => {
    if (!clothingImage) {
      setError('Por favor, envie uma imagem da roupa.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const result = await generateModelImage(
          clothingImage,
          { ...opts, numberOfImages: 1 }, // Force 1 image
          faceReferenceImage
      );
      setGeneratedImages([result]);

      const now = Date.now();
      const limitKey = `vittrinia_gen_limit_guest`;
      const storedLimits = localStorage.getItem(limitKey);
      let limits = storedLimits ? JSON.parse(storedLimits) : { count: 0, timestamp: now };
      
      if (now - limits.timestamp > 24 * 60 * 60 * 1000) {
        limits = { count: 1, timestamp: now };
      } else {
        limits.count += 1;
      }

      localStorage.setItem(limitKey, JSON.stringify(limits));
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Ocorreu um erro ao gerar a imagem. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [clothingImage, faceReferenceImage]);

  const handleGenerate = useCallback(() => {
    const now = Date.now();

    if (lastGenerationTime && now - lastGenerationTime < 20000) {
        const timeLeft = Math.ceil((20000 - (now - lastGenerationTime)) / 1000);
        setError(`Por favor, aguarde ${timeLeft} segundos antes de gerar novamente.`);
        return;
    }
    
    const limitKey = `vittrinia_gen_limit_guest`;
    const storedLimits = localStorage.getItem(limitKey);
    if (storedLimits) {
        let { count, timestamp } = JSON.parse(storedLimits);
        if (now - timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem(limitKey);
        } else if (count >= 20) {
            setError('Você atingiu o limite de 20 gerações por dia. Por favor, tente novamente amanhã.');
            return;
        }
    }
    
    setLastGenerationTime(now);
    runGeneration(options);
  }, [options, runGeneration, lastGenerationTime]);

  const handleResetForNewClothing = () => {
    setClothingImage(null);
    setGeneratedImages(null);
    setError(null);
  };

  const handleDownload = (imageUrl: string, format: 'png' | 'jpeg') => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    const fileName = `modelo-vittrinia-${Date.now()}.${format}`;
    
    if (format === 'png') {
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                link.href = canvas.toDataURL('image/jpeg');
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        };
    }
  };

  return (
    <>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <div
        className="min-h-screen text-gray-300 font-sans relative"
        style={{
          backgroundImage: `url(${logoBase64})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-950/80 to-purple-950/80"></div>
        
        <div className="relative z-10 pb-20">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ControlsPanel
                    clothingImage={clothingImage}
                    setClothingImage={setClothingImage}
                    faceReferenceImage={faceReferenceImage}
                    setFaceReferenceImage={setFaceReferenceImage}
                    options={options}
                    setOptions={setOptions}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    modelSizeOptions={modelSizeOptions}
                    backgroundOptions={backgroundOptions}
                    modelAppearanceOptions={modelAppearanceOptions}
                    footwearOptions={footwearOptions}
                    outputFormatOptions={outputFormatOptions}
                    poseOptions={poseOptions}
                />
                <ImageDisplay
                    generatedImages={generatedImages}
                    isLoading={isLoading}
                    error={error}
                    onRedo={handleGenerate}
                    onKeepModel={handleResetForNewClothing}
                    onDownload={handleDownload}
                />
                </div>
            </main>
        </div>
        
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
            <button 
            onClick={() => setIsAboutModalOpen(true)}
            className="px-5 py-2 text-sm font-medium text-gray-300 bg-gray-900/60 backdrop-blur-md border border-fuchsia-500/30 rounded-full hover:bg-gray-800/80 hover:border-fuchsia-500/60 transition-all duration-300 transform hover:scale-105"
            >
            Sobre
            </button>
        </footer>
      </div>
    </>
  );
};

export default App;
