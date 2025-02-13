-- Passo 1: Criar a operação ADMIN caso não exista
INSERT INTO "Operation" (id, name)
SELECT lower(hex(randomblob(16))), 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM "Operation" WHERE name = 'ADMIN');

-- Passo 2: Obter o ID da operação padrão (ADMIN)
WITH default_op AS (
    SELECT id FROM "Operation" WHERE name = 'ADMIN' LIMIT 1
)

-- Passo 3: Atualizar todos os usuários que não têm operação associada
UPDATE "User"
SET "operationId" = (SELECT id FROM default_op)
WHERE "operationId" IS NULL;
