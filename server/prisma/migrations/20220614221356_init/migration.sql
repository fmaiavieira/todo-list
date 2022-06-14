-- CreateTable
CREATE TABLE "BoardTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);
