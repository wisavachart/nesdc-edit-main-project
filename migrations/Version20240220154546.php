<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240220154546 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE population ADD user_create_id INT');
        $this->addSql('ALTER TABLE population ADD user_update_id INT');
        $this->addSql('ALTER TABLE population ADD date_create DATETIME2(6)');
        $this->addSql('ALTER TABLE population ADD is_enabled BIT');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_B449A008EEFE5067 ON population (user_create_id)');
        $this->addSql('CREATE INDEX IDX_B449A008D5766755 ON population (user_update_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE population DROP CONSTRAINT FK_B449A008EEFE5067');
        $this->addSql('ALTER TABLE population DROP CONSTRAINT FK_B449A008D5766755');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_B449A008EEFE5067\')
                            ALTER TABLE population DROP CONSTRAINT IDX_B449A008EEFE5067
                        ELSE
                            DROP INDEX IDX_B449A008EEFE5067 ON population
                    ');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_B449A008D5766755\')
                            ALTER TABLE population DROP CONSTRAINT IDX_B449A008D5766755
                        ELSE
                            DROP INDEX IDX_B449A008D5766755 ON population
                    ');
        $this->addSql('ALTER TABLE population DROP COLUMN user_create_id');
        $this->addSql('ALTER TABLE population DROP COLUMN user_update_id');
        $this->addSql('ALTER TABLE population DROP COLUMN date_create');
        $this->addSql('ALTER TABLE population DROP COLUMN is_enabled');
    }
}
