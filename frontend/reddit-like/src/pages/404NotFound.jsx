import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  let animationId;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/homepage');
    }, 17000);  // Timer
    return () => clearTimeout(timer);
  }, [navigate]);

  // Animation : https://codepen.io/DonKarlssonSan/pen/xQRjww
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Vector {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
      }
      addTo(v) {
        this.x += v.x;
        this.y += v.y;
      }
      subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
      }
      getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
      }
      setLength(length) {
        const current = this.getLength();
        if (current === 0) return;
        const scale = length / current;
        this.x *= scale;
        this.y *= scale;
      }
    }

    class BlackHole {
      constructor(x, y) {
        this.pos = new Vector(x, y);
      }
      applyGravityOn(thing) {
        const dist = thing.pos.sub(this.pos);
        const length = dist.getLength();
        const g = 2000 / (length * length);
        dist.setLength(g);
        thing.vel.subFrom(dist);
      }
    }

    class Particle {
      constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
      }
      move() {
        if (this.vel.getLength() > 4) {
          this.vel.setLength(4);
        }
        this.pos.addTo(this.vel);
      }
      draw() {
        const r = this.pos.sub(new Vector(w / 2, h / 2)).getLength() / 60;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const blackHole = new BlackHole(w / 2, h / 2);
    let particles = [];

    function setupParticles() {
      particles = [];
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(Math.random() * w, Math.random() * h));
      }
    }

    function draw() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'white';

      particles.forEach((p) => {
        blackHole.applyGravityOn(p);
        p.draw();
        p.move();
      });

      particles.push(new Particle(random(-50, w + 50), random(-50, h + 50)));
      particles = particles.filter(
        (p) => blackHole.pos.sub(p.pos).getLength() > 2
      );

      animationId = requestAnimationFrame(draw);
    }

    function random(min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function handleResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);
    setupParticles();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />


      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-8xl font-bold text-white mb-4 animate-pulse drop-shadow-md">
          404
        </h1>
        <p className="text-xl text-gray-300 mb-6 drop-shadow">
          Le néant interséidéral ... <br />
          Bienvenue  sur le fetch de l'infini ..
        </p>
        <button
          onClick={() => navigate('/homepage')}
          className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-100 transition"
        >
          Retour à la réalité
        </button>
      </div>
    </div>
  );
}
