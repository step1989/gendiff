[![Maintainability](https://api.codeclimate.com/v1/badges/7d1395000f5be9fe138c/maintainability)](https://codeclimate.com/github/step1989/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7d1395000f5be9fe138c/test_coverage)](https://codeclimate.com/github/step1989/backend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.org/step1989/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/step1989/backend-project-lvl2)

# Сравнитель файлов

### Описание
Консольная утилита для сравнения двух файлов.
Поддерживаемые форматы : json, yaml, ini.

Утилита поддерживает три формата вывода:
  - подробный (pretty), по умолчанию
  - построчный (plain)
  - JSON
  
  ### Установка из npm
```sudo npm install -g diff-file-rsv```


  ### Локальная установка
  Cклонируйте проект
  
  `git clone https://github.com/step1989/gendiff.git`
  
  В папке с проектом выполните команды
  
  * `make build`
  * `make publish`
  * `make link`


  ### Использование
  Для вывода справки:
  `gendiff -h`
  
 ```
  Usage: gendiff [options] <firstConfig> <secondConfig>

  Compares two configuration files and shows a difference.

  Options:
  -V, --version        output the version number
  -f, --format [type]  output format (pretty, plain, json). Default output pretty
  -h, --help           output usage information
  ```
  ### Примеры использования
  Сравнение "плоских файлов"(Формат файлов - ini, вывод - по умолчанию)
  [![asciicast](https://asciinema.org/a/f11VkfMW9FtSDm4g8BAaNWL0D.svg)](https://asciinema.org/a/f11VkfMW9FtSDm4g8BAaNWL0D)
  
  Сравнение файлов с вложенной структурой (Формат файлов - json, вывод - построчный)
  [![asciicast](https://asciinema.org/a/Qhi0mIykRenLfHVbPMzOeacF4.svg)](https://asciinema.org/a/Qhi0mIykRenLfHVbPMzOeacF4)
  
  Сравнение файлов с вложенной структуров (Формат файлов - yaml, вывод - JSON)
  [![asciicast](https://asciinema.org/a/l9dlPLaiWg0Idio2TzoXaG4sh.svg)](https://asciinema.org/a/l9dlPLaiWg0Idio2TzoXaG4sh)
