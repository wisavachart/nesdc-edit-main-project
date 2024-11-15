<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240224155540 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE environment (id INT IDENTITY NOT NULL, factor_id INT, province_id INT, user_create_id INT, user_update_id INT, year NVARCHAR(255), value DOUBLE PRECISION, date_create DATETIME2(6), date_update DATETIME2(6), is_enabled BIT, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_4626DE22BC88C1A3 ON environment (factor_id)');
        $this->addSql('CREATE INDEX IDX_4626DE22E946114A ON environment (province_id)');
        $this->addSql('CREATE INDEX IDX_4626DE22EEFE5067 ON environment (user_create_id)');
        $this->addSql('CREATE INDEX IDX_4626DE22D5766755 ON environment (user_update_id)');
        $this->addSql('ALTER TABLE environment ADD CONSTRAINT FK_4626DE22BC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE environment ADD CONSTRAINT FK_4626DE22E946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE environment ADD CONSTRAINT FK_4626DE22EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE environment ADD CONSTRAINT FK_4626DE22D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE environment');
    }
}
