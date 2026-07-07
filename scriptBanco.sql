create database SeguraInforma;
GO

USE SeguraInforma;
GO

CREATE TABLE usuarios (
    id_usuario INTEGER IDENTITY PRIMARY KEY,
    nome VARCHAR(100),
    email NCHAR(50),
    senha NCHAR(50),
    cargo NCHAR(50),
   
);

CREATE TABLE Mapa_De_Risco (
    id_mapa INTEGER IDENTITY PRIMARY KEY,
    descricao NCHAR(100),
    data_criacao DATE,
    data_atualizacao DATE,
    fk_usuario_id_usuario INTEGER,
    fk_area_id_area INTEGER,
    nome_foto NCHAR(100)
);

CREATE TABLE EPI (
    id_epi INTEGER IDENTITY  PRIMARY KEY,
    nome NCHAR(100),
    numero_ca INTEGER,
    descricao NCHAR(100),
    qntd_estoque INTEGER
);

CREATE TABLE Risco (
    id_risco INTEGER IDENTITY PRIMARY KEY,
    tipo_risco NCHAR(50),
    grau_risco VARCHAR(50),
    descricao NCHAR(100)
);

CREATE TABLE entrega_epi (
    id_entrega_epi INTEGER IDENTITY  PRIMARY KEY,
    data_entrega DATE,
    data_devolucao DATE,
    aceito BIT,
    fk_usuario_id_usuario INTEGER
);

CREATE TABLE area_contem_risco (
    fk_area_id_area INTEGER,
    fk_id_risco INTEGER
);

CREATE TABLE area_exige_epi (
    fk_area_id_area INTEGER,
    fk_EPI_id_epi INTEGER
);

CREATE TABLE entrega_tem_epi (
    fk_EPI_id_epi INTEGER,
    fk_entrega_epi_id_entrega_epi INTEGER
);

CREATE TABLE area (
    id_area INTEGER IDENTITY PRIMARY KEY,
    nome_area NCHAR(50),
    descricao NCHAR(100)
);
 

 
ALTER TABLE Mapa_De_Risco ADD CONSTRAINT FK_Mapa_De_Risco_2
    FOREIGN KEY (fk_usuario_id_usuario)
    REFERENCES usuarios (id_usuario);
 
ALTER TABLE Mapa_De_Risco ADD CONSTRAINT FK_Mapa_De_Risco_3
    FOREIGN KEY (fk_area_id_area)
    REFERENCES area (id_area);
 
ALTER TABLE entrega_epi ADD CONSTRAINT FK_entrega_epi_2
    FOREIGN KEY (fk_usuario_id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE;
 
ALTER TABLE area_contem_risco ADD CONSTRAINT FK_area_contem_risco_1
    FOREIGN KEY (fk_area_id_area)
    REFERENCES area (id_area)
    ON DELETE SET NULL;
 
ALTER TABLE area_contem_risco ADD CONSTRAINT FK_area_contem_risco_2
    FOREIGN KEY (fk_id_risco)
    REFERENCES Risco (id_risco);
 
ALTER TABLE area_exige_epi ADD CONSTRAINT FK_area_exige_epi_1
    FOREIGN KEY (fk_area_id_area)
    REFERENCES area (id_area)
    ON DELETE SET NULL;
 
ALTER TABLE area_exige_epi ADD CONSTRAINT FK_area_exige_epi_2
    FOREIGN KEY (fk_EPI_id_epi)
    REFERENCES EPI (id_epi)
    ON DELETE SET NULL;
 
ALTER TABLE entrega_tem_epi ADD CONSTRAINT FK_entrega_tem_epi_1
    FOREIGN KEY (fk_EPI_id_epi)
    REFERENCES EPI (id_epi)
    ON DELETE SET NULL;
 
ALTER TABLE entrega_tem_epi ADD CONSTRAINT FK_entrega_tem_epi_2
    FOREIGN KEY (fk_entrega_epi_id_entrega_epi)
    REFERENCES entrega_epi (id_entrega_epi)
    ON DELETE SET NULL;


    -- USUÁRIOS
INSERT INTO usuarios (nome, email, senha, cargo)
VALUES
('João Silva', 'joao@email.com', 123456, 'Técnico de Segurança'),
('Maria Souza', 'maria@email.com', 654321, 'Engenheira de Segurança'),
('Carlos Santos', 'carlos@email.com', 111222, 'Operador'),
('Ana Oliveira', 'ana@email.com', 333444, 'Supervisora'),
('Pedro Lima', 'pedro@email.com', 555666, 'Operador');

-- ÁREAS
INSERT INTO area (nome_area, descricao)
VALUES
('Soldagem', 'Área destinada a serviços de soldagem'),
('Pintura', 'Área destinada a pintura industrial'),
('Almoxarifado', 'Armazenamento de materiais'),
('Produção', 'Linha de produção principal'),
('Manutenção', 'Manutenção de equipamentos');

-- EPIs
INSERT INTO EPI (nome, numero_ca,descricao, qntd_estoque)
VALUES
('Capacete', 12,'Proteção da cabeça', 50),
('Óculos de Proteção',50, 'Proteção ocular', 80),
('Luva de Raspa',22, 'Proteção das mãos', 100),
('Protetor Auricular', 45, 'Proteção auditiva', 120),
('Máscara Respiratória', 10,'Proteção respiratória', 60);

-- RISCOS
INSERT INTO Risco (tipo_risco, grau_risco, descricao)
VALUES
('Físico', 'Alto', 'Exposição a ruídos intensos'),
('Químico', 'Médio', 'Contato com solventes'),
('Biológico', 'Baixo', 'Contato com microrganismos'),
('Ergonômico', 'Médio', 'Postura inadequada'),
('Acidente', 'Alto', 'Risco de quedas');

-- MAPAS DE RISCO
INSERT INTO Mapa_De_Risco
(descricao, data_criacao, data_atualizacao, fk_usuario_id_usuario, fk_area_id_area, nome_foto)
VALUES
('Mapa da área de Soldagem', '2026-01-10', '2026-03-15', 1, 1, 'ft.jpg'),
('Mapa da área de Pintura', '2026-01-15', '2026-03-20', 2, 2, 'ft1.jpg'),
('Mapa do Almoxarifado', '2026-02-01', '2026-03-25', 1, 3, 'ft2.jpg'),
('Mapa da Produção', '2026-02-10', '2026-04-01', 2, 4, 'ft3.jpg'),
('Mapa da Manutenção', '2026-02-20', '2026-04-05', 1, 5, 'ft4.jpg');

-- ENTREGA DE EPI
INSERT INTO entrega_epi
(data_entrega, data_devolucao, aceito, fk_usuario_id_usuario)
VALUES
('2026-04-01', '2026-10-01', 0, 3),
('2026-04-02', '2026-10-02', 0,4),
('2026-04-03', '2026-10-03', 0, 5),
('2026-04-04', '2026-10-04', 0, 3),
('2026-04-05', '2026-10-05', 0, 4);

-- ÁREA CONTÉM RISCO
INSERT INTO area_contem_risco
(fk_area_id_area, fk_id_risco)
VALUES
(1,1),
(1,5),
(2,2),
(3,4),
(4,1),
(4,4),
(5,5);

-- ÁREA EXIGE EPI
INSERT INTO area_exige_epi
(fk_area_id_area, fk_EPI_id_epi)
VALUES
(1,1),
(1,2),
(1,3),
(2,2),
(2,5),
(3,1),
(4,4),
(5,1),
(5,3);

-- ENTREGA TEM EPI
INSERT INTO entrega_tem_epi
(fk_EPI_id_epi, fk_entrega_epi_id_entrega_epi)
VALUES
(1,1),
(2,1),
(3,1),

(1,2),
(4,2),

(2,3),
(5,3),

(1,4),
(3,4),

(1,5),
(2,5),
(4,5);