-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEvents` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventName` VARCHAR(100) NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `attendanceStatus` ENUM('Hadir', 'TidakHadir', 'MungkinHadir') NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    INDEX `idx_user_events_username`(`username`),
    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
