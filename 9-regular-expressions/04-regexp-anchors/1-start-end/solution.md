Uma string vazia é a única correspondência: Ela começa e imediatamente termina.

Esta tarefa demostra novamente que âncoras não são caracteres, mas sim testes.

A string está vazia `""`. O interpretador primeiro encontra o padrão de início da entrada `pattern:^` (que sim, está lá), e então imediatamente o fim da entrada `pattern:$` (que também está). Temos uma correspondência.
