<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240224143310 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE houses ADD factor_id INT');
        $this->addSql('ALTER TABLE houses ADD CONSTRAINT FK_95D7F5CBBC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('CREATE INDEX IDX_95D7F5CBBC88C1A3 ON houses (factor_id)');
        $this->addSql('ALTER TABLE population ADD factor_id INT');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008BC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('CREATE INDEX IDX_B449A008BC88C1A3 ON population (factor_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE houses DROP CONSTRAINT FK_95D7F5CBBC88C1A3');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_95D7F5CBBC88C1A3\')
                            ALTER TABLE houses DROP CONSTRAINT IDX_95D7F5CBBC88C1A3
                        ELSE
                            DROP INDEX IDX_95D7F5CBBC88C1A3 ON houses
                    ');
        $this->addSql('ALTER TABLE houses DROP COLUMN factor_id');
        $this->addSql('ALTER TABLE population DROP CONSTRAINT FK_B449A008BC88C1A3');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_B449A008BC88C1A3\')
                            ALTER TABLE population DROP CONSTRAINT IDX_B449A008BC88C1A3
                        ELSE
                            DROP INDEX IDX_B449A008BC88C1A3 ON population
                    ');
        $this->addSql('ALTER TABLE population DROP COLUMN factor_id');
    }
}
