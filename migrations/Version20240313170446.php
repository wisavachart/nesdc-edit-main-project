<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240313170446 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE [escape] (id INT IDENTITY NOT NULL, factor_id INT, sub_factor_id INT, province_id INT, user_create_id INT, user_update_id INT, year NVARCHAR(255), have BIT, value DOUBLE PRECISION, yes DOUBLE PRECISION, no DOUBLE PRECISION, date_create DATETIME2(6), date_update DATETIME2(6), is_enabled BIT, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_25E8B08EBC88C1A3 ON [escape] (factor_id)');
        $this->addSql('CREATE INDEX IDX_25E8B08EAE85871D ON [escape] (sub_factor_id)');
        $this->addSql('CREATE INDEX IDX_25E8B08EE946114A ON [escape] (province_id)');
        $this->addSql('CREATE INDEX IDX_25E8B08EEEFE5067 ON [escape] (user_create_id)');
        $this->addSql('CREATE INDEX IDX_25E8B08ED5766755 ON [escape] (user_update_id)');
        $this->addSql('ALTER TABLE [escape] ADD CONSTRAINT FK_25E8B08EBC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE [escape] ADD CONSTRAINT FK_25E8B08EAE85871D FOREIGN KEY (sub_factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE [escape] ADD CONSTRAINT FK_25E8B08EE946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE [escape] ADD CONSTRAINT FK_25E8B08EEEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE [escape] ADD CONSTRAINT FK_25E8B08ED5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE [escape]');
    }
}
