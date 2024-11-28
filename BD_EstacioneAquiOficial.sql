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
CREATE DATABASE IF NOT EXISTS `estacione_aqui` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `estacione_aqui`;

-- Copiando estrutura para tabela estacione_aqui.desenvolvedores
CREATE TABLE IF NOT EXISTS `desenvolvedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estacione_aqui.desenvolvedores: ~9 rows (aproximadamente)
INSERT INTO `desenvolvedores` (`id`, `nome`, `login`, `email`, `senha`) VALUES
	(1, 'Miguel Sabino Galvão', 'miguelsabino.galvao@gmail.com', 'miguelsabino.galvao@gmail.com', '91ea856dc1eb004d31bce64f182c4590cda42c510d4acfee2b7491d4745eeae8'),
	(2, 'João Victor Silva Peixoto', 'chinbrinha12@gmail.com', 'chinbrinha12@gmail.com', 'b83ffbedb2e021decc67ebed565252a700edb59f5e26e3eefad995ab36b76262'),
	(4, 'Paulo Ricardo Silva De Castro', 'pauloricardosilvadecastro@gmail.com', 'pauloricardosilvadecastro@gmail.com', '77f58be1537fb3cae5a95bd8ec9140748566e6b603a1f1d0082a7d14aa847bf5'),
	(5, 'Anderson Roberto De Aguiar', 'anderson.roberto3@senaisp.edu.br', 'anderson.roberto3@senaisp.edu.br', 'c1fafc5d917585c2f526235290f5a437f4d850ffe05cc51b9bd4980785bbc3d4'),
	(6, 'Rodrigo Alves Nunes ', 'rodrigo.anunes@portalsesisp.org.br', 'rodrigo.anunes@portalsesisp.org.br', 'da24cc20f14a259ce12f18dcc3d31e3110139771ba20b342949859b6ee34f38e'),
	(7, 'Matheus Souza De Oliveira', 'matheus.oliveira238@senaisp.edu.br', 'matheus.oliveira238@senaisp.edu.br', 'ea1e76cb4948d2892ecccfbe80557de5227cc56890a17de012ec2bc0bd67577c'),
	(8, 'Bruno De Souza Ferreira', 'bruno.ferreira23@senaisp.edu.br', 'bruno.ferreira23@senaisp.edu.br', '631b963b0608dc9986194d3d44ec7188ac7fee086bbc975abc315b54847765a3'),
	(11, 'Jorge Gabriel Costa Dos Santos', 'jorgegabrielcdsantos@gmail.com', 'jorgegabrielcdsantos@gmail.com', '1d1a806f2e8a7ead3eb1f0bff8b2f5da650c270518c2d065185285ec7e4624b8'),
	(12, 'Otávio Garcia', 'otavio.santos4@portalsesisp.org.br', 'otavio.santos4@portalsesisp.org.br', '2892563a30129afc976fa9877a3ab6355769ef491858ebe56fffcb3edd033923');

-- Copiando estrutura para tabela estacione_aqui.estabelecimentos
CREATE TABLE IF NOT EXISTS `estabelecimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `url_imagem` varchar(500) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `horario_abertura` varchar(5) NOT NULL,
  `horario_fechamento` varchar(5) NOT NULL,
  `localizacao` varchar(150) NOT NULL,
  `endereco_nome` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estacione_aqui.estabelecimentos: ~24 rows (aproximadamente)
INSERT INTO `estabelecimentos` (`id`, `nome`, `url_imagem`, `telefone`, `horario_abertura`, `horario_fechamento`, `localizacao`, `endereco_nome`) VALUES
	(1, 'Cabine do Estacionamento Piso WL (Prudenshopping)', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=dsMlaV05IfhtakVb6FRIQQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=157.13487&pitch=0&thumbfov=100', '00000000', '09:00', '22:00', '-22.115565993530343, -51.41020217278881', 'Uep2-S.3, Pres. Prudente - SP, 19010-090'),
	(5, 'Barretto e Caseiro BC Parking', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=GEEN6kewqc5sGCZaid02VQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=263.85413&pitch=0&thumbfov=100', '18997717146', '08:00', '18:00', '-22.11430810731194, -51.405230775580975 ', 'R. Tiradentes, 140 - Jardim Paulista, Pres. Prudente - SP, 19023-550'),
	(6, 'SMART Estacionamento', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=sek-9O7i-_Xb4Ssq1pKdAQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=167.23459&pitch=0&thumbfov=100', '00000000', '08:00', '18:00', '-22.114687010141196, -51.405097075580855', 'R. Tiradentes, 183 - Jardim Paulista, Pres. Prudente - SP, 19023-550'),
	(7, 'Estacionamento Komatsu', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=ArCXrCaauJfOp40_G9ZV0g&cb_client=search.gws-prod.gps&w=408&h=240&yaw=260.16202&pitch=0&thumbfov=100', '00000000', '07:00', '13:00', '-22.122570534124957, -51.39081631975711', ' R. Djalma Dutra, 332 - Jardim Aviação, Pres. Prudente - SP, 19020-440'),
	(8, 'Kaka Estacionamento Ltda', 'https://lh5.googleusercontent.com/p/AF1QipNtMF9qcPb_iTVD361O1zzCqPZRJG8M8r4xv17T=w532-h240-k-no', '1832228528', '07:00', '18:30', '-22.121653272258058, -51.388922060239565', 'R. Ribeiro de Barros, 1665 - Jardim Aviação, Pres. Prudente - SP, 19015-030'),
	(9, 'Estacionamento Angel Park', 'https://lh5.googleusercontent.com/p/AF1QipPWZW1NZrmyJDH1xrWNjcT17wLOLXOPQaEVmAYd=w426-h240-k-no', '18996550540', '8:00', '18:00', '-22.119840926192, -51.390459450437184', ' R. José Dias Cintra, 14 - Vila Ocidental, Pres. Prudente - SP, 19015-050'),
	(10, 'Nobre Estacionamento', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=roFmOh5XPIJdnPQjCy1ZgA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=129.5953&pitch=0&thumbfov=100', '18997456566', '7:30', '18:00', '-22.121631411278223, -51.386580419757074', 'R. Joaquim Nabuco, 427 - Bairro do Bosque, Pres. Prudente - SP, 19070-010'),
	(11, 'Drive Estacionamento', 'https://lh5.googleusercontent.com/p/AF1QipM_iz38EtqZlYocOWF9xCRY1P6JC8XPdeWQQqmY=w408-h306-k-no', '1839031063', '08:00', '18:00', '-22.121128115481188, -51.38609761975724', 'Av. Washington Luiz, 456 - Centro, Pres. Prudente - SP, 19010-090'),
	(12, 'Estacionamento NVK', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=iJqtoTUryh9RWWRtfLk43A&cb_client=search.gws-prod.gps&w=408&h=240&yaw=207.74878&pitch=0&thumbfov=100', '00000000', '07:00', '18:00', '-22.11708753192749, -51.38613181975727', 'R. São Sebastião, 41 - Vila Machadinho, Pres. Prudente - SP, 19020-640'),
	(13, 'Auto Park Estacionamento', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=beibweIS0H7Ho5ul2z9xlA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=291.01968&pitch=0&thumbfov=100', '18997198177', '07:00', '21:00', '-22.124495813794162, -51.38420915761917', 'Av. Brasil, 716 - Centro, Pres. Prudente - SP, 19030-010'),
	(14, 'Clube Park Estacionamento Ltda Me', 'https://lh5.googleusercontent.com/p/AF1QipOzJwuH0b-0eeui_Tt3gVzwcH-RaMhO7HEV4y28=w412-h240-k-no', '1839081342', '23:59', '00:00', '-22.13269674411695, -51.406800904415576', 'Rua José Bongiovani, Av. Comendador Hiroshi Yoshio - Vila Liberdade, Pres. Prudente - SP, 19050-680'),
	(15, 'Ecco Park Estacionamento', 'https://lh5.googleusercontent.com/p/AF1QipNxd8LtaTm5xF4N4kfQRGWqy3zWojonsKsYjvU=w408-h725-k-no', '18998020870', '6:30', '16:00', '-22.13508254647169, -51.40807224674506', 'Av. Comendador Hiroshi Yoshio - Jardim Aquinopolis, Pres. Prudente - SP, 19050-680'),
	(16, 'Estacionamento Pare Bem', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Lbz3zb7Kbp2B_sqPb-QzeQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=96.73953&pitch=0&thumbfov=100', '18997375940', '23:59', '00:00', '-22.124675425627984, -51.388463979274675', 'R. Joaquim Nabuco, 819 - Centro, Pres. Prudente - SP, 19010-071'),
	(17, 'ESTACIONAMENTO FÓRMULA 1 ', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=HjUQnyBp7VcbmXucYOuP2w&cb_client=search.gws-prod.gps&w=408&h=240&yaw=292.5798&pitch=0&thumbfov=100', '18997964318', '09:00', '18:00', '-22.12217954376914, -51.38521183509831', 'R. Maj. Felício Tarabay, 400 - Centro, Pres. Prudente - SP, 19010-051'),
	(18, 'Estacionamento Rodoviária', 'https://lh5.googleusercontent.com/p/AF1QipPnDuSHW5mFdH7gyU3MFXFWJMrd5M2yEMFXUNuB=w408-h484-k-no', '00000000', '23:59', '00:00', '-22.131024072738956, -51.38835531975678', ' R. Dr. José Foz, 1339-1407 - Vila Sao Jorge, Pres. Prudente - SP, 19013-010'),
	(19, 'Sollares Estacionamentos', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=5JadTR6MUPKMjKk3OAI9jA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=99.558365&pitch=0&thumbfov=100', '00000000', '09:00', '18:00', '-22.123181362235595, -51.38530196208636', ' R. Maj. Felício Tarabay, 497 - Centro, Pres. Prudente - SP, 19010-051'),
	(20, 'Estacionamento Pare Fácil', 'https://lh5.googleusercontent.com/p/AF1QipNxpzAtUtu0hmSdYfA3lYCeU8OibQncdCsq0Vrn=w408-h724-k-no', '1899772-777', '09:00', '15:00', '-22.124906775238458, -51.386495690921784', 'R. Maj. Felício Tarabay, 718 - Centro, Pres. Prudente - SP, 19010-051'),
	(21, 'Francar Park Estacionamento', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=EFgJvKqQ_iBbcb1jWuWm1A&cb_client=search.gws-prod.gps&w=408&h=240&yaw=320.6463&pitch=0&thumbfov=100', '18997546643', '09:00', '18:00', '-22.124461964131328, -51.38733060441579', ' Uep1-S.1, Pres. Prudente - SP'),
	(22, 'Cila Park', 'https://lh5.googleusercontent.com/p/AF1QipMtowIY15CM0GFK8lRXIvKu7aW49VtN4sp7-_fX=w408-h306-k-no', '18981104181', '07:00', '18:30', '-22.12930626377653, -51.394174590921665', ' R. Piracicaba, 106 - Vila Tabajara, Pres. Prudente - SP, 19014-150'),
	(23, 'Estacionamento Toninho', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=1Oj8us3_INXGOiCSlvMqcQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=308.7731&pitch=0&thumbfov=100', '18997421543', '09:00', '15:00', '-22.124929564066825, -51.38865684674522', 'R. Joaquim Nabuco, 842 - Centro, Pres. Prudente - SP, 19010-071'),
	(24, 'Estacionamento JR', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=rYdgB2KRD617AYcG1B-1Rw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=25.174688&pitch=0&thumbfov=100', '00000000', '09:00', '15:00', '-22.12204084773494, -51.386335934072214', ' R. Dr. Gurgel, 388 - Centro, Pres. Prudente - SP, 19010-020'),
	(25, 'A.S. ESTACIONAMENTO', 'https://lh5.googleusercontent.com/p/AF1QipMojhVHtQUKm1rcfX0xiWNKIFDvk30qEF7PrMYO=w427-h240-k-no', '18997224675', '08:00', '18:00', '-22.116305115837168, -51.396618390543736', ' Av. Washington Luiz, 1607 - Uep3-S.1, Pres. Prudente - SP, 19023-450'),
	(26, 'WV Estacionamento', 'https://lh5.googleusercontent.com/p/AF1QipP9hjw6RSunGR6_11fEWCppj-pAXsfJJUl0Tqs3=w408-h240-k-no-pi0-ya240-ro0-fo100', '1832228000', '23:99', '24:00', '-22.17905369389639, -51.4177288357877', ' R. Assis Chateaubriand - Jardim aeroporto, Pres. Prudente - SP'),
	(27, 'Zot car estacionamento', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=qIn4In9zJpNe0Mad5MccNA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=272.14957&pitch=0&thumbfov=100', '18997020630', '09:00', '15:00', '-22.125837414834532, -51.38687920441566', ' R. Maj. Felício Tarabay, 824 - Centro, Pres. Prudente - SP, 19010-025');

-- Copiando estrutura para tabela estacione_aqui.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `verification_expires` datetime DEFAULT NULL,
  `foto` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela estacione_aqui.usuarios: ~54 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `usuario`, `email`, `senha`, `verification_code`, `verification_expires`, `foto`) VALUES
	(1, 'Ana Silva', 'ana.silva@example.com', '55a5e9e78207b4df8699d60886fa070079463547b095d1a05bc719bb4e6cd251', NULL, NULL, NULL),
	(2, 'Bruno Costa', 'bruno.costa@example.com', '6b08d780140e292a4af8ba3f2333fc1357091442d7e807c6cad92e8dcd0240b7', NULL, NULL, NULL),
	(3, 'Carlos Pereira', 'carlos.pereira@example.com', 'b578dc5fcbfabbc7e96400601d0858c951f04929faef033bbbc117ab935c6ae9', NULL, NULL, NULL),
	(4, 'Daniela Souza', 'daniela.souza@example.com', '2288821c6b799cf47a8c9aa231f361ffb906bbee0d5fb5e1767509e27442cc62', NULL, NULL, NULL),
	(5, 'Eduardo Lima', 'eduardo.lima@example.com', 'bdade8e386731cab0ba59a7d6ea1936b1fca870437fee103112fec6d8afcc30d', NULL, NULL, NULL),
	(6, 'Fernanda Almeida', 'fernanda.almeida@example.com', 'ef4c20bace3f51dd85f4d7a67e43ba9901a80037a5e6a45dc5e13a8e20d73126', NULL, NULL, NULL),
	(7, 'Gabriel Rocha', 'gabriel.rocha@example.com', '2c70dfbc967bd610fc7fbc6dfef0708a99d6be1fc44be3dffa47f0dde132442b', NULL, NULL, NULL),
	(8, 'Helena Martins', 'helena.martins@example.com', 'efef5e906af2c59a7a2ea808cf7f55c09cbe2d66dfa2552305e3594b02067c4e', NULL, NULL, NULL),
	(9, 'Igor Santos', 'igor.santos@example.com', '5b8c3ba7de01a6d1a7fef7209281250eb1af7e4b68604d9e16d3e6931b47c865', NULL, NULL, NULL),
	(10, 'Juliana Mendes', 'juliana.mendes@example.com', '7143ac38138aa93a30328f399c0f6bdd0a7260a88c60df78820fa0069b074948', NULL, NULL, NULL),
	(11, 'Kleber Ferreira', 'kleber.ferreira@example.com', 'f0ec3d1edc095b9754ebe57c4f3150f2c7e54c80eb0f3e66e9a96cdedd3eeb81', NULL, NULL, NULL),
	(12, 'Larissa Oliveira', 'larissa.oliveira@example.com', 'b9d085288c02ac8454b4213720cb70ca8bf15cb42da2e706fbb80d605a943f48', NULL, NULL, NULL),
	(13, 'Marcos Silva', 'marcos.silva@example.com', 'a61e6fcef06150477190391d2f7571189e7323304e4d6bde4c74da96fb4e828a', NULL, NULL, NULL),
	(14, 'Natália Costa', 'natalia.costa@example.com', 'bdb3fcf69aa424c617baf001c536bc5b33f230b9b00333dde19c690da17c25e7', NULL, NULL, NULL),
	(15, 'Otávio Almeida', 'otavio.almeida@example.com', 'af7cc5ed1ab76176c1eb9c18ccd08c9ccd2e5727ee5bf9e012aa66c86a9c4430', NULL, NULL, NULL),
	(16, 'Paula Santos', 'paula.santos@example.com', '6dbe0a0506cf758b622ddd363148b9b332e96cf3234e4e0b8baa809549771a18', NULL, NULL, NULL),
	(17, 'Quiteria Ramos', 'quiteria.ramos@example.com', '55b563d3c2753658a2f1c158e23e0fe05ee2da79ab5825209fc72a0be29b6fe9', NULL, NULL, NULL),
	(18, 'Ricardo Lima', 'ricardo.lima@example.com', 'decbd8b9ed3b9d892342965b23698e9c2458f0b18d9bedec1a1308082740c934', NULL, NULL, NULL),
	(19, 'Sofia Martins', 'sofia.martins@example.com', 'a395aada0d738ed3476886c7578bc2aefe668a80059cc120b1733bdebfb29218', NULL, NULL, NULL),
	(20, 'Thiago Ferreira', 'thiago.ferreira@example.com', 'c9b4c38b73c3ec815cbc57f5fe96895f998b881d5e3247702f7ec6dc90d08f97', NULL, NULL, NULL),
	(21, 'Ursula Nunes', 'ursula.nunes@example.com', '77bc9d23b3825870e85136e1ea1f323578f8681a311acc5cbdaf4f91170998b2', NULL, NULL, NULL),
	(22, 'Vinícius Costa', 'vinicius.costa@example.com', 'cdd400173815fc6aa6def1c66e9b0876d1fed4b8867973f1c8d8a12543267421', NULL, NULL, NULL),
	(23, 'Wanda Oliveira', 'wanda.oliveira@example.com', '18c72ca796495e5afb1475c496d8221f2c6f48a72128948770050fd0ce512f6f', NULL, NULL, NULL),
	(24, 'Xavier Almeida', 'xavier.almeida@example.com', '3f26db1152e4bd2655a408ca66feb05851e5259931efa27d4d0c8836db5f9300', NULL, NULL, NULL),
	(25, 'Yasmin Ferreira', 'yasmin.ferreira@example.com', '149410c952ea76a32721c769da9edf7d9a74bd62a5896c32566fb3976777ec99', NULL, NULL, NULL),
	(26, 'Zé Carlos', 'ze.carlos@example.com', '81438b900f1c77e9154970d57d1fa27144be8240e8dc107f791d2e9867b64605', NULL, NULL, NULL),
	(27, 'Alice Lima', 'alice.lima@example.com', '0030aedfcea48a8144a46d4bb61c7821c5a81d6555b9c350b800455f26705b68', NULL, NULL, NULL),
	(28, 'Brenda Nascimento', 'brenda.nascimento@example.com', '355f2c4bb3cd3a2c085fa6e80de161d397695ffc7f3d9d14caef1d217d3af72d', NULL, NULL, NULL),
	(29, 'Cláudio Santos', 'claudio.santos@example.com', '7318067eced744c7893f296b019410528a8f60138ef4f066b42073d56b0ff8a6', NULL, NULL, NULL),
	(30, 'Diana Lopes', 'diana.lopes@example.com', '64709bac2747a1b351455cba1d5c2d83708818d62ad2c1683f4d6023d4562556', NULL, NULL, NULL),
	(31, 'Elias Pires', 'elias.pires@example.com', 'e76566559a51d4810b42bdd5e75e9120fce19592cc5a3e42f443ad6ce5ca37d7', NULL, NULL, NULL),
	(32, 'Fábio Sousa', 'fabio.sousa@example.com', '2c3a0a5ca4147d14c20290f6d9a5686c6d9a32ab255474e555f5e80ca3301522', NULL, NULL, NULL),
	(33, 'Gisele Rodrigues', 'gisele.rodrigues@example.com', 'b355ba3c60e9d468b034a1ed64acfeaec17d126cb36a5c7c14b9dedf97010bc2', NULL, NULL, NULL),
	(34, 'Hugo Almeida', 'hugo.almeida@example.com', '33223106777b2602ab60f3dfde8944c38b7df4c36c0088bee8184f8723715160', NULL, NULL, NULL),
	(35, 'Isabel Costa', 'isabel.costa@example.com', '3560653186537694be7bc85eb75b4dbf43f5849398b748bf5b85b774aebc4354', NULL, NULL, NULL),
	(36, 'João Silva', 'joao.silva@example.com', '2990b33c256a118bce5d647abf4666db215d0dbf86442fc40d796da7d562848e', NULL, NULL, NULL),
	(37, 'Karina Mendes', 'karina.mendes@example.com', '38f455c40d54a23746b7f4e63b7b0c4df6df74c88f5cb5914e98fd2246c0bfca', NULL, NULL, NULL),
	(38, 'Leonardo Lima', 'leonardo.lima@example.com', '1620ea070a3ce8e9dbf51e668bbed0a9f2ec4138fb13ff77555c6728cc02f87d', NULL, NULL, NULL),
	(39, 'Miriam Costa', 'miriam.costa@example.com', 'a0185ae2b54fc6d1307405b5addf6e256b76ab6e8e38da4cb557c9aa7e0f1296', NULL, NULL, NULL),
	(40, 'Nicolas Rocha', 'nicolas.rocha@example.com', '1f30a1be4d906e7616159d2ed120e7236378b06cd74742189992cf6616cb7aed', NULL, NULL, NULL),
	(41, 'Olivia Pereira', 'olivia.pereira@example.com', 'd9c8d25f8db3632d1933593fd6f41017cf4f3399d3b01f941bdee06d57a04654', NULL, NULL, NULL),
	(42, 'Pedro Alves', 'pedro.alves@example.com', '0680293b3bfb88845cf398cd881a8caaebe61910d5b938d37efa6f5d8011f159', NULL, NULL, NULL),
	(43, 'Quincy Martins', 'quincy.martins@example.com', 'ebfbc9e6b33c4c82e0c7e9a8090b569aea73d91f5cd67939b207e74822f8bff9', NULL, NULL, NULL),
	(44, 'Raquel Santos', 'raquel.santos@example.com', 'c953d332a2c54e44f5bfcf216b69ece8688bb39f90fd03061a00aa5bb61506f6', NULL, NULL, NULL),
	(45, 'Samuel Nascimento', 'samuel.nascimento@example.com', '7ae879cfb73180fbe99095a586d1a27908690fc3ecb31b8eee1d38e1038bff85', NULL, NULL, NULL),
	(46, 'Tatiane Ferreira', 'tatiane.ferreira@example.com', 'a6d627a5ed3f20dbf355b124b1a1f396aab1f69e21b6a5a39d47c150b65d1c05', NULL, NULL, NULL),
	(47, 'Ulisses Rocha', 'ulisses.rocha@example.com', 'ccf775d3ce945e9a14186db86ed200cfc581cc4f35eae34c56f3cb19e906db29', NULL, NULL, NULL),
	(48, 'Vivian Almeida', 'vivian.almeida@example.com', '3e41530d690e1d954858c4e1dac488880201de215e214c0784c4eb1f7cda3609', NULL, NULL, NULL),
	(49, 'Wellington Santos', 'wellington.santos@example.com', '4c4708c0d7425f16702eb902aa27fa7e3bf8ad0912624bfbc8be8bf3426c4140', NULL, NULL, NULL),
	(50, 'Yuri Costa', 'yuri.costa@example.com', '9e37e7aa917ede7285462df6a5f8a818fe2e4d41bcb32deace43343c2f359e59', NULL, NULL, NULL),
	(51, 'Zoe Lima', 'zoe.lima@example.com', '21ca869c47103831ce2f2d964da2321c0dcaaf1d2c378189ea3431c89daf6e3b', NULL, NULL, NULL),
	(53, 'galvao07teste', 'winnerefiefi@gmail.com', '8998afc716e732fffd21edab4dab08b8ad28771d4b83ae9d79790f075a150f4d', NULL, NULL, NULL),
	(54, 'paulo7', 'pauloteste@gmail.com', 'ce91c9b0b9320d03b392277b68e1e2f48f1befc9f6ed69180bd8ffd66100b075', NULL, NULL, NULL),
	(55, 'jorge', 'jorgegabrielcdsantos@gmail.com', 'f69ed3a744195d7d1429b167f449ed9a76f36ba6a74f997a7bfe179649de32c4', NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
