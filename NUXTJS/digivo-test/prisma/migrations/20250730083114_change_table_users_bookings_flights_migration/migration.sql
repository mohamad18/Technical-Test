/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `flightId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `seatsBooked` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `flightNumber` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `loyaltyPoints` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[flight_number]` on the table `flights` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `flight_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats_booked` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_time` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flight_number` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_flightId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_userId_fkey`;

-- DropIndex
DROP INDEX `bookings_flightId_fkey` ON `bookings`;

-- DropIndex
DROP INDEX `bookings_userId_fkey` ON `bookings`;

-- DropIndex
DROP INDEX `flights_flightNumber_key` ON `flights`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `bookingDate`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `flightId`,
    DROP COLUMN `seatsBooked`,
    DROP COLUMN `userId`,
    ADD COLUMN `booking_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `flight_id` INTEGER NOT NULL,
    ADD COLUMN `seats_booked` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `flights` DROP COLUMN `createdAt`,
    DROP COLUMN `departureTime`,
    DROP COLUMN `flightNumber`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `departure_time` DATETIME(3) NOT NULL,
    ADD COLUMN `flight_number` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createdAt`,
    DROP COLUMN `loyaltyPoints`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `loyalty_points` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `flights_flight_number_key` ON `flights`(`flight_number`);

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
