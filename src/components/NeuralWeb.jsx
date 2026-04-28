import React, { useEffect, useRef } from 'react';

const NeuralWeb = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const nodes = [];
    const nodeCount = 60;
    const connectionDistance = 140;
    const mouse = { x: null, y: null, radius: 180 };

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Natural floating movement
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off walls
        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        // Mouse interaction (Magnetism)
        if (mouse.x !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            const accel = force * 4; // Magnet strength

            this.x += directionX * accel;
            this.y += directionY * accel;
          }
        }

        // Elastic return to base position
        let dxBase = this.baseX - this.x;
        let dyBase = this.baseY - this.y;
        this.x += dxBase * 0.05;
        this.y += dyBase * 0.05;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)'; // Sky Blue
        ctx.fill();
      }
    }

    const init = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[400px] lg:min-h-[500px]"
      style={{ touchAction: 'none' }}
    />
  );
};

export default NeuralWeb;
