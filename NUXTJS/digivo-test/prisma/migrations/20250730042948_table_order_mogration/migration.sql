-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produk_id` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `kode_unik` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `tanggal` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_tanggal_kode_unik_key`(`tanggal`, `kode_unik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
