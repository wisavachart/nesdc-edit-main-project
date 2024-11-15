<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240107091609 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE coefficient (id INT IDENTITY NOT NULL, user_create_id INT, user_update_id INT, b0 DOUBLE PRECISION, b1 DOUBLE PRECISION, b2 DOUBLE PRECISION, b3 DOUBLE PRECISION, b4 DOUBLE PRECISION, b5 DOUBLE PRECISION, b6 DOUBLE PRECISION, b7 DOUBLE PRECISION, d INT, date_create DATETIME2(6), date_update DATETIME2(6), PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_3F061B61EEFE5067 ON coefficient (user_create_id)');
        $this->addSql('CREATE INDEX IDX_3F061B61D5766755 ON coefficient (user_update_id)');
        $this->addSql('CREATE TABLE configurations (id INT IDENTITY NOT NULL, name NVARCHAR(500), value NVARCHAR(500), PRIMARY KEY (id))');
        $this->addSql('CREATE TABLE poverty_ratio (id INT IDENTITY NOT NULL, user_create_id INT, user_update_id INT, province_id INT, province NVARCHAR(500), y DOUBLE PRECISION, x1 DOUBLE PRECISION, x2 DOUBLE PRECISION, x3 DOUBLE PRECISION, x4 DOUBLE PRECISION, x5 DOUBLE PRECISION, x6 DOUBLE PRECISION, d INT, date_create DATETIME2(6), date_update DATETIME2(6), year NVARCHAR(255), PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_863A8A7AEEFE5067 ON poverty_ratio (user_create_id)');
        $this->addSql('CREATE INDEX IDX_863A8A7AD5766755 ON poverty_ratio (user_update_id)');
        $this->addSql('CREATE TABLE users (id INT IDENTITY NOT NULL, email NVARCHAR(180) NOT NULL, roles VARCHAR(MAX) NOT NULL, password NVARCHAR(255) NOT NULL, name NVARCHAR(1000), PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9E7927C74 ON users (email) WHERE email IS NOT NULL');
        $this->addSql('EXEC sp_addextendedproperty N\'MS_Description\', N\'(DC2Type:json)\', N\'SCHEMA\', \'dbo\', N\'TABLE\', \'users\', N\'COLUMN\', roles');
        $this->addSql('ALTER TABLE coefficient ADD CONSTRAINT FK_3F061B61EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE coefficient ADD CONSTRAINT FK_3F061B61D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE poverty_ratio ADD CONSTRAINT FK_863A8A7AEEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE poverty_ratio ADD CONSTRAINT FK_863A8A7AD5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE coefficient DROP CONSTRAINT FK_3F061B61EEFE5067');
        $this->addSql('ALTER TABLE coefficient DROP CONSTRAINT FK_3F061B61D5766755');
        $this->addSql('ALTER TABLE poverty_ratio DROP CONSTRAINT FK_863A8A7AEEFE5067');
        $this->addSql('ALTER TABLE poverty_ratio DROP CONSTRAINT FK_863A8A7AD5766755');
        $this->addSql('DROP TABLE coefficient');
        $this->addSql('DROP TABLE configurations');
        $this->addSql('DROP TABLE poverty_ratio');
        $this->addSql('DROP TABLE users');
    }
}
