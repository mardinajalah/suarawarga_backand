-- CreateTable
CREATE TABLE `Berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `id_penulis` INTEGER NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `konten` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Berita_judul_key`(`judul`),
    UNIQUE INDEX `Berita_desc_key`(`desc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penulis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `krator` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_id_penulis_fkey` FOREIGN KEY (`id_penulis`) REFERENCES `Penulis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penulis` ADD CONSTRAINT `Penulis_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
