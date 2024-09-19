/*
  Warnings:

  - The `age` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `size` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energy_level` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `environment` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AGE" AS ENUM ('Filhote', 'Adulto', 'Idoso');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('Pequenino', 'Pequeno', 'Medio', 'Grande', 'Gigante');

-- CreateEnum
CREATE TYPE "ENERGY" AS ENUM ('Sedentario', 'Calmo', 'Moderado', 'Ativo', 'Hiperativo');

-- CreateEnum
CREATE TYPE "ENVIRONMENT" AS ENUM ('Compacto', 'Medio', 'Amplo');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" "AGE" NOT NULL DEFAULT 'Filhote',
DROP COLUMN "size",
ADD COLUMN     "size" "SIZE" NOT NULL DEFAULT 'Pequenino',
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "ENERGY" NOT NULL DEFAULT 'Moderado',
DROP COLUMN "environment",
ADD COLUMN     "environment" "ENVIRONMENT" NOT NULL DEFAULT 'Amplo';
