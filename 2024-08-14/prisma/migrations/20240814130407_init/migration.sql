-- CreateTable
CREATE TABLE `music` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `artists` VARCHAR(100) NOT NULL,
    `album` VARCHAR(60) NOT NULL,
    `genres` VARCHAR(400) NOT NULL,
    `single` BOOLEAN NOT NULL,
    `release` YEAR NOT NULL,
    `duration` TIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `complete_name` VARCHAR(100) NOT NULL,
    `user` VARCHAR(100) NOT NULL,
    `type` ENUM('User', 'Adm') NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(10) NOT NULL,
    `date_birth` DATE NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_user_key`(`user`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `preco` DECIMAL(5, 2) NOT NULL,
    `stock` SMALLINT UNSIGNED NULL DEFAULT 0,
    `assessment` DECIMAL(3, 2) NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
