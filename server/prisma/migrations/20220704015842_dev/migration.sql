-- CreateTable
CREATE TABLE "boardtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expire_date" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
