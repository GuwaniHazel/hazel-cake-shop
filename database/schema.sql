CREATE DATABASE IF NOT EXISTS hazeldb;
USE hazeldb;

-- Disable foreign key checks for schema changes
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL DEFAULT 'User',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Cakes Table
CREATE TABLE IF NOT EXISTS Cakes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    ImageUrl VARCHAR(2000) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(18, 2) NOT NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. OrderItems Table
CREATE TABLE IF NOT EXISTS OrderItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    CakeId INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    FOREIGN KEY (CakeId) REFERENCES Cakes(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Branches Table
CREATE TABLE IF NOT EXISTS Branches (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    City VARCHAR(100) NOT NULL,
    Address VARCHAR(500) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    MapUrl VARCHAR(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Branches
TRUNCATE TABLE Branches;
INSERT INTO Branches (City, Address, Phone, MapUrl) VALUES
('Colombo', '120 Galle Road, Colombo 03, Sri Lanka', '+94 11 234 5678', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d126743.585859787!2d79.78616429381665!3d6.921837446180479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe1347b9ab3e1fa7c!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk'),
('Kandy', '45 Temple Street, Kandy, Sri Lanka', '+94 81 223 4567', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d31652.883713504874!2d80.62089456209355!3d7.29057153177651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662d8a43f455%3A0x75c35b30a2e02673!2sKandy!5e0!3m2!1sen!2slk!4v1700000000001!5m2!1sen!2slk'),
('Galle', '88 Light House Street, Galle Fort, Galle, Sri Lanka', '+94 91 224 8888', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d15873.71960241031!2d80.20786523955078!3d6.031575000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932f6b3%3A0xefd3e38708c353e6!2sGalle%20Fort!5e0!3m2!1sen!2slk!4v1700000000002!5m2!1sen!2slk'),
('Kurunegala', '12 Colombo Road, Kurunegala, Sri Lanka', '+94 37 222 1212', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d31622.756247953284!2d80.34773826209867!3d7.487042531336495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3396c21e64917%3A0xd647afb57df38c5b!2sKurunegala!5e0!3m2!1sen!2slk!4v1700000000003!5m2!1sen!2slk'),
('Negombo', '204 Lewis Place, Negombo, Sri Lanka', '+94 31 227 9999', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d31618.34994276131!2d79.82772596210006!3d7.208882531238411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e9dc1b61405b%3A0xbc4e7ff53457a1e!2sNegombo!5e0!3m2!1sen!2slk!4v1700000000004!5m2!1sen!2slk');

-- Seed Cakes (Initial premium menu)
TRUNCATE TABLE Cakes;
INSERT INTO Cakes (Name, Description, Price, Category, ImageUrl) VALUES
('Hazelnut Praline Dream', 'Layered toasted hazelnut sponge with silky gianduja chocolate praline buttercream and gold leaf accents.', 48.00, 'Chocolate', '/uploads/hazelnut_praline.jpg'),
('Velvet Rose Raspberry', 'Light vanilla chiffon cake layered with premium white chocolate ganache, fresh organic raspberry compote, and edible rose petals.', 42.00, 'Fruit', '/uploads/velvet_rose.jpg'),
('Dark Chocolate Espresso Truffle', 'Rich flourless dark chocolate cake infused with single-origin espresso and finished with dark chocolate glaze and cocoa nibs.', 46.00, 'Chocolate', '/uploads/chocolate_espresso.jpg'),
('Salted Caramel Macadamia', 'A luxury brown-butter sponge layered with homemade salted fleur de sel caramel and dry roasted crushed macadamias.', 45.00, 'Special', '/uploads/salted_caramel.jpg'),
('Pistachio Cardamom Blossom', 'Exquisite wild pistachio cake flavored with premium Persian cardamom, layered with cream cheese mousse and crushed pistachios.', 52.00, 'Special', '/uploads/pistachio_blossom.jpg'),
('Classic Luxury Vanilla Bean', 'Traditional sponge infused with Madagascar Bourbon vanilla bean caviar, topped with fresh light cream and edible flowers.', 38.00, 'Special', '/uploads/classic_vanilla.jpg');

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
