
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CanvasProps = React.ComponentPropsWithoutRef<"canvas"> & {
  blurColor?: string;
  blurSize?: number;
  intensity?: number;
  backgroundColor?: string;
  noiseIntensity?: number;
  noiseColor?: string;
  highlightColor?: string;
  highlightSize?: number;
  particleCount?: number;
  particleSize?: number;
  frameRate?: number;
  className?: string;
  responsive?: boolean;
  containerClassName?: string;
};

export function AuroraBackground({
  blurColor = "rgba(88, 95, 253, 0.4)",
  blurSize = 150,
  intensity = 0.85,
  backgroundColor = "rgb(10, 10, 30)",
  noiseIntensity = 0.03,
  noiseColor = "rgb(255, 255, 255)",
  highlightColor = "rgba(235, 200, 255, 0.8)",
  highlightSize = 40,
  particleCount = 300,
  particleSize = 1.5,
  frameRate = 35,
  className,
  containerClassName,
  responsive = true,
  ...props
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      setSize({ width, height });
      canvas.width = width;
      canvas.height = height;
    };

    updateSize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      originalColor: string;
      rotationSpeed: number;
      rotation: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * particleSize + 0.5;
        this.originalColor = blurColor;
        this.color = blurColor;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.rotation = 0;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life++;

        if (this.life > this.maxLife) {
          this.life = 0;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        // Bounce off edges with a slight damping effect
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.9;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.9;
        }

        // Add small random movement
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;

        // Limit velocity
        const maxVel = 0.8;
        this.vx = Math.max(Math.min(this.vx, maxVel), -maxVel);
        this.vy = Math.max(Math.min(this.vy, maxVel), -maxVel);

        // Gradually drift toward center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distX = centerX - this.x;
        const distY = centerY - this.y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        if (dist > 100) {
          this.vx += distX / dist * 0.01;
          this.vy += distY / dist * 0.01;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = (this.maxLife - this.life) / this.maxLife * intensity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const addNoise = (ctx: CanvasRenderingContext2D) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * noiseIntensity;
        data[i] += noise * 255; // R
        data[i + 1] += noise * 255; // G
        data[i + 2] += noise * 255; // B
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const renderFrame = (time: number) => {
      if (time - lastUpdateTime.current < 1000 / frameRate) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      
      lastUpdateTime.current = time;
      
      if (!ctx) return;
      
      // Background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set composite operation for glow effect
      ctx.globalCompositeOperation = "lighter";
      
      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      // Add occasional highlight
      if (Math.random() > 0.97) {
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * highlightSize + 10;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, highlightColor);
        gradient.addColorStop(1, "rgba(235, 200, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";
      
      // Add noise
      if (noiseIntensity > 0) {
        addNoise(ctx);
      }
      
      // Apply blur with lower quality for performance
      ctx.filter = `blur(${blurSize / 10}px)`;
      ctx.globalAlpha = 0.6;
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      ctx.globalAlpha = 1;

      animationFrameId.current = requestAnimationFrame(renderFrame);
    };

    animationFrameId.current = requestAnimationFrame(renderFrame);

    if (responsive) {
      window.addEventListener("resize", updateSize);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (responsive) {
        window.removeEventListener("resize", updateSize);
      }
    };
  }, [
    blurColor,
    blurSize,
    intensity,
    backgroundColor,
    highlightColor,
    highlightSize,
    particleCount,
    particleSize,
    noiseIntensity,
    noiseColor,
    frameRate,
    responsive,
  ]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0", className)}
        width={size.width}
        height={size.height}
        {...props}
      />
    </div>
  );
}
