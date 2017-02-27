-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 26/11/2016 às 14:32
-- Versão do servidor: 5.6.32-78.1
-- Versão do PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `vitor632_wis`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Carros`
--

CREATE TABLE IF NOT EXISTS `Carros` (
  `ID` int(11) NOT NULL,
  `CARRO` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ANO` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `KM` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `VALOR` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `vendido` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Fazendo dump de dados para tabela `Carros`
--

INSERT INTO `Carros` (`ID`, `CARRO`, `ANO`, `KM`, `VALOR`, `vendido`) VALUES
(1, 'Celta', '2015', '1000 km', 'R$ 35.000,00', '1'),
(2, 'Fiesta', '2016', '0', 'R$ 47.000,00', '1'),
(3, 'Novo Ka', '2016', '0', '37.990,00', '0');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Usuario`
--

CREATE TABLE IF NOT EXISTS `Usuario` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `SECONDNAME` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Fazendo dump de dados para tabela `Usuario`
--

INSERT INTO `Usuario` (`ID`, `FIRSTNAME`, `SECONDNAME`, `EMAIL`, `Password`) VALUES
(1, 'Vitor', 'Vieira', 'vitorgvieira1@gmail.com', 'guizo1234'),
(2, 'Guilherme', 'Vieira', 'guizo9@hotmail.com', 'guizo123'),
(3, 'Guilherme', 'guilherme', 'vieira1@gmail.com', 'guizo123'),
(4, '', '', '', ''),
(5, '1', '2', '3', ''),
(6, 'vitor', 'vieira', 'vitorgv@ciandt.com', 'guizo123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE IF NOT EXISTS `vendas` (
  `ID` int(11) NOT NULL,
  `nomeComprador` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cpfComprador` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `telefoneComprador` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `enderecoComprador` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `carroComprador` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Fazendo dump de dados para tabela `vendas`
--

INSERT INTO `vendas` (`ID`, `nomeComprador`, `cpfComprador`, `telefoneComprador`, `enderecoComprador`, `carroComprador`) VALUES
(4, 'Vitor', '442.396.008-88', '(11)94131-7455', 'Rua Andrade Solteiro, 105', '1 - Celta'),
(5, 'Felipe Cavalaro', '452.268.985-22', '(11) 92152-2015', 'Rua Dos Professores bons', '2 - Fiesta');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
