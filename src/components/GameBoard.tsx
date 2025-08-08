import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Position {
  x: number;
  y: number;
}

interface GameStats {
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameBoard = () => {
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    timeLeft: 30,
    isPlaying: false,
    difficulty: 'medium'
  });
  
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 50, y: 50 });
  const [isTargetVisible, setIsTargetVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('neonClickHighScore') || '0');
  });

  const getDifficultySettings = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { speed: 2000, size: 80, gameTime: 45 };
      case 'medium':
        return { speed: 1500, size: 60, gameTime: 30 };
      case 'hard':
        return { speed: 1000, size: 40, gameTime: 20 };
      default:
        return { speed: 1500, size: 60, gameTime: 30 };
    }
  };

  const moveTarget = useCallback(() => {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    const rect = gameArea.getBoundingClientRect();
    const { size } = getDifficultySettings(gameStats.difficulty);
    
    const maxX = rect.width - size;
    const maxY = rect.height - size;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setTargetPosition({ x: newX, y: newY });
    setIsTargetVisible(true);
  }, [gameStats.difficulty]);

  const startGame = () => {
    const { gameTime } = getDifficultySettings(gameStats.difficulty);
    setGameStats(prev => ({
      ...prev,
      isPlaying: true,
      timeLeft: gameTime,
      score: 0
    }));
    setGameStarted(true);
    moveTarget();
  };

  const endGame = useCallback(() => {
    setGameStats(prev => ({ ...prev, isPlaying: false }));
    setIsTargetVisible(false);
    
    if (gameStats.score > highScore) {
      setHighScore(gameStats.score);
      localStorage.setItem('neonClickHighScore', gameStats.score.toString());
    }
  }, [gameStats.score, highScore]);

  const handleTargetClick = () => {
    if (!gameStats.isPlaying) return;
    
    setGameStats(prev => ({ ...prev, score: prev.score + 1 }));
    setIsTargetVisible(false);
    
    // Add a small delay before showing the next target
    setTimeout(() => {
      moveTarget();
    }, 100);
  };

  // Game timer
  useEffect(() => {
    if (!gameStats.isPlaying) return;
    
    const timer = setInterval(() => {
      setGameStats(prev => {
        if (prev.timeLeft <= 1) {
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStats.isPlaying]);

  // End game when time runs out
  useEffect(() => {
    if (gameStats.timeLeft === 0 && gameStats.isPlaying) {
      endGame();
    }
  }, [gameStats.timeLeft, gameStats.isPlaying, endGame]);

  // Auto-move target
  useEffect(() => {
    if (!gameStats.isPlaying) return;
    
    const { speed } = getDifficultySettings(gameStats.difficulty);
    const interval = setInterval(moveTarget, speed);
    
    return () => clearInterval(interval);
  }, [gameStats.isPlaying, gameStats.difficulty, moveTarget]);

  const resetGame = () => {
    setGameStarted(false);
    setGameStats({
      score: 0,
      timeLeft: 30,
      isPlaying: false,
      difficulty: gameStats.difficulty
    });
    setIsTargetVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-4 font-orbitron">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-dark opacity-90"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      
      {/* Main game container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-in">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 animate-neon-glow">
            NEON CLICK
          </h1>
          <p className="text-xl text-neon-cyan font-mono">
            CHALLENGE • CYBERPUNK EDITION
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <Card className="bg-card/20 backdrop-blur-sm border-neon-cyan/30 p-4 animate-float">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">{gameStats.score}</div>
              <div className="text-sm text-muted-foreground font-mono">SCORE</div>
            </div>
          </Card>
          
          <Card className="bg-card/20 backdrop-blur-sm border-neon-purple/30 p-4 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">{gameStats.timeLeft}</div>
              <div className="text-sm text-muted-foreground font-mono">TIME</div>
            </div>
          </Card>
          
          <Card className="bg-card/20 backdrop-blur-sm border-neon-pink/30 p-4 animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink">{highScore}</div>
              <div className="text-sm text-muted-foreground font-mono">BEST</div>
            </div>
          </Card>
        </div>

        {/* Difficulty Selector */}
        {!gameStarted && (
          <div className="flex justify-center gap-4 mb-8">
            {(['easy', 'medium', 'hard'] as const).map((diff) => (
              <Button
                key={diff}
                variant={gameStats.difficulty === diff ? "default" : "outline"}
                onClick={() => setGameStats(prev => ({ ...prev, difficulty: diff }))}
                className={`
                  font-mono uppercase tracking-wide transition-all duration-300
                  ${gameStats.difficulty === diff 
                    ? 'bg-gradient-primary text-black shadow-neon-cyan border-0' 
                    : 'border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan'
                  }
                `}
              >
                {diff}
              </Button>
            ))}
          </div>
        )}

        {/* Game Area */}
        <Card 
          id="game-area"
          className="relative w-full h-[500px] mx-auto bg-black/40 backdrop-blur-sm border-2 border-neon-cyan/30 shadow-game-area overflow-hidden"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Moving target */}
          {isTargetVisible && gameStats.isPlaying && (
            <div
              className="absolute transition-all duration-200 ease-out cursor-pointer animate-neon-pulse"
              style={{
                left: `${targetPosition.x}px`,
                top: `${targetPosition.y}px`,
                width: `${getDifficultySettings(gameStats.difficulty).size}px`,
                height: `${getDifficultySettings(gameStats.difficulty).size}px`,
              }}
              onClick={handleTargetClick}
            >
              <div className="w-full h-full bg-gradient-accent rounded-lg shadow-neon-pink border-2 border-neon-pink flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          )}

          {/* Start/Game Over overlay */}
          {!gameStats.isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              {!gameStarted ? (
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-neon-cyan mb-4 animate-neon-glow">
                    READY TO JACK IN?
                  </h2>
                  <p className="text-muted-foreground mb-6 font-mono">
                    Click the glowing targets as fast as you can!
                  </p>
                  <Button 
                    onClick={startGame}
                    className="bg-gradient-primary text-black font-bold px-8 py-4 text-xl hover:scale-105 transition-transform shadow-neon-cyan"
                  >
                    START GAME
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-neon-pink mb-4 animate-neon-pulse">
                    GAME OVER
                  </h2>
                  <div className="text-2xl text-neon-cyan mb-2">Final Score: {gameStats.score}</div>
                  {gameStats.score === highScore && gameStats.score > 0 && (
                    <div className="text-neon-yellow mb-4 font-mono animate-neon-glow">
                      🎉 NEW HIGH SCORE! 🎉
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button 
                      onClick={startGame}
                      className="bg-gradient-primary text-black font-bold px-6 py-3 hover:scale-105 transition-transform shadow-neon-cyan"
                    >
                      PLAY AGAIN
                    </Button>
                    <Button 
                      onClick={resetGame}
                      variant="outline"
                      className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:shadow-neon-purple"
                    >
                      MENU
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Instructions */}
        <div className="text-center mt-8 text-muted-foreground font-mono text-sm">
          <p>Click the glowing targets before they disappear • Faster clicks = Higher score</p>
          <p className="mt-2">Easy: 45s, Large targets • Medium: 30s, Medium targets • Hard: 20s, Small targets</p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;