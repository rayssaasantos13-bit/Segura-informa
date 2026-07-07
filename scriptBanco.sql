create database SeguraInforma;
GO

USE SeguraInforma;
GO

CREATE TABLE usuarios (
    id_usuario INTEGER IDENTITY PRIMARY KEY,
    nome VARCHAR(100),
    email NCHAR(50),
    senha NCHAR(10),
    cargo NCHAR(50)
);

CREATE TABLE Mapa_De_Risco (
    id_mapa INTEGER IDENTITY PRIMARY KEY,
    descricao NCHAR(100),
    data_criacao DATE,
    data_atualizacao DATE,
    nome_foto NCHAR(100),
    fk_usuario_id_usuario INTEGER,
    fk_area_id_area INTEGER
);

CREATE TABLE EPI (
    id_epi INTEGER IDENTITY  PRIMARY KEY,
    nome NCHAR(100),
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

    -- USU�RIOS
INSERT INTO usuarios (nome, email, senha, cargo)
VALUES
('Jo�o Silva', 'joao@email.com', 123456, 'T�cnico de Seguran�a'),
('Maria Souza', 'maria@email.com', 654321, 'Engenheira de Seguran�a'),
('Carlos Santos', 'carlos@email.com', 111222, 'Operador'),
('Ana Oliveira', 'ana@email.com', 333444, 'Supervisora'),
('Pedro Lima', 'pedro@email.com', 555666, 'Operador');

-- �REAS
INSERT INTO area (nome_area, descricao)
VALUES
('Soldagem', '�rea destinada a servi�os de soldagem'),
('Pintura', '�rea destinada a pintura industrial'),
('Almoxarifado', 'Armazenamento de materiais'),
('Produ��o', 'Linha de produ��o principal'),
('Manuten��o', 'Manuten��o de equipamentos');

-- EPIs
INSERT INTO EPI (nome, descricao, qntd_estoque)
VALUES
('Capacete', 'Prote��o da cabe�a', 50),
('�culos de Prote��o', 'Prote��o ocular', 80),
('Luva de Raspa', 'Prote��o das m�os', 100),
('Protetor Auricular', 'Prote��o auditiva', 120),
('M�scara Respirat�ria', 'Prote��o respirat�ria', 60);

-- RISCOS
INSERT INTO Risco (tipo_risco, grau_risco, descricao)
VALUES
('F�sico', 'Alto', 'Exposi��o a ru�dos intensos'),
('Qu�mico', 'M�dio', 'Contato com solventes'),
('Biol�gico', 'Baixo', 'Contato com microrganismos'),
('Ergon�mico', 'M�dio', 'Postura inadequada'),
('Acidente', 'Alto', 'Risco de quedas');

-- MAPAS DE RISCO
INSERT INTO Mapa_De_Risco
(descricao, data_criacao, data_atualizacao, nome_foto, fk_usuario_id_usuario, fk_area_id_area)
VALUES
('Mapa da �rea de Soldagem', '2026-01-10', '2026-03-15', 'foto1.jpg', 1, 1),
('Mapa da �rea de Pintura', '2026-01-15', '2026-03-20','foto2.jpg',  2, 2),
('Mapa do Almoxarifado', '2026-02-01', '2026-03-25','foto3.jpg',  1, 3),
('Mapa da Produ��o', '2026-02-10', '2026-04-01','foto4.jpg',  2, 4),
('Mapa da Manuten��o', '2026-02-20', '2026-04-05', 'foto5.jpg', 1, 5);

-- ENTREGA DE EPI
INSERT INTO entrega_epi
(data_entrega, data_devolucao, fk_usuario_id_usuario)
VALUES
('2026-04-01', '2026-10-01', 3),
('2026-04-02', '2026-10-02', 4),
('2026-04-03', '2026-10-03', 5),
('2026-04-04', '2026-10-04', 3),
('2026-04-05', '2026-10-05', 4);

-- �REA CONT�M RISCO
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

-- �REA EXIGE EPI
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