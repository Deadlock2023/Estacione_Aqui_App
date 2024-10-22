-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para estacione_aqui
DROP DATABASE IF EXISTS `estacione_aqui`;
CREATE DATABASE IF NOT EXISTS `estacione_aqui` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `estacione_aqui`;

-- Copiando estrutura para tabela estacione_aqui.estabelecimentos
DROP TABLE IF EXISTS `estabelecimentos`;
CREATE TABLE IF NOT EXISTS `estabelecimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `url_imagem` varchar(500) NOT NULL DEFAULT '',
  `telefone` varchar(11) NOT NULL,
  `horario_abertura` varchar(5) NOT NULL,
  `horario_fechamento` varchar(5) NOT NULL,
  `localizacao` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estacione_aqui.estabelecimentos: ~18 rows (aproximadamente)
INSERT INTO `estabelecimentos` (`id`, `nome`, `url_imagem`, `telefone`, `horario_abertura`, `horario_fechamento`, `localizacao`) VALUES
	(1, 'Estabelecimento A', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '123456789', '08:00', '18:00', 'Rua Exemplo, 123'),
	(2, 'Estabelecimento B', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '987654321', '09:00', '17:00', 'Avenida Teste, 456'),
	(3, 'Estabelecimento C', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '555666777', '10:00', '22:00', 'Praça Central, 789'),
	(4, 'Estabelecimento D', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '222333444', '07:30', '19:30', 'Bairro Jardim, 321'),
	(5, 'Estabelecimento E', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '444555666', '11:00', '23:00', 'Avenida Brasil, 654'),
	(6, 'Estabelecimento F', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '777888999', '08:00', '20:00', 'Rua Nova, 987'),
	(7, 'Estabelecimento G', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '111222333', '09:00', '21:00', 'Rua das Flores, 135'),
	(8, 'Estabelecimento H', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '444777888', '10:00', '22:00', 'Avenida dos Trabalhadores, 246'),
	(9, 'Estabelecimento I', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '333444555', '06:00', '18:00', 'Rua do Comércio, 357'),
	(10, 'Estabelecimento J', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '666777888', '12:00', '20:00', 'Praça da Liberdade, 468'),
	(11, 'Estabelecimento K', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '999000111', '07:00', '17:00', 'Bairro Alto, 579'),
	(12, 'Estabelecimento L', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '222333444', '10:00', '22:00', 'Rua das Águas, 680'),
	(13, 'Estabelecimento M', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '555666777', '09:00', '21:00', 'Avenida dos Anjos, 791'),
	(14, 'Estabelecimento N', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '888999000', '08:30', '19:30', 'Rua do Sol, 802'),
	(15, 'Estabelecimento O', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '111222333', '09:30', '18:30', 'Praça do Povo, 913'),
	(16, 'Estabelecimento P', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '444555666', '10:00', '20:00', 'Bairro Verde, 024'),
	(17, 'Estabelecimento Q', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '777888999', '11:00', '21:00', 'Rua das Estrelas, 135'),
	(18, 'Estabelecimento R', 'https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-um-sinal-de-estacionamento-sobre-um-fundo-transparente_841845-863.jpg', '333444555', '06:30', '18:30', 'Avenida do Horizonte, 246');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
