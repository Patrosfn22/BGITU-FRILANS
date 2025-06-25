#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Запуск BGITU Freelance Hub...\n');

// Проверяем наличие node_modules
if (!fs.existsSync('node_modules')) {
  console.log('📦 Установка зависимостей...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Зависимости установлены успешно!\n');
      startDev();
    } else {
      console.error('❌ Ошибка при установке зависимостей');
      process.exit(1);
    }
  });
} else {
  startDev();
}

function startDev() {
  console.log('🌟 Запуск сервера разработки...');
  console.log('📱 Платформа будет доступна по адресу: http://localhost:5173');
  console.log('🎓 BGITU Freelance Hub - Платформа фриланс-заданий для студентов');
  console.log('💼 Партнерские проекты от ведущих IT-компаний');
  console.log('🏆 Академические задания от преподавателей\n');
  
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  dev.on('close', (code) => {
    console.log(`\n🛑 Сервер остановлен с кодом ${code}`);
  });
  
  // Обработка сигналов для корректного завершения
  process.on('SIGINT', () => {
    console.log('\n👋 Завершение работы BGITU Freelance Hub...');
    dev.kill('SIGINT');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n👋 Завершение работы BGITU Freelance Hub...');
    dev.kill('SIGTERM');
    process.exit(0);
  });
}