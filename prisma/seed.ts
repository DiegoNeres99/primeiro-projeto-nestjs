import { PrismaClient, TipoEndereco } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const universidade = await prisma.universidade.create({
    data: {
      nome: 'Universidade OpenAI',
      cnpj: '12.345.678/0001-99',
      enderecos: {
        create: {
          logradouro: 'Rua das Inteligências',
          numero: '42',
          bairro: 'Tecnologia',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01000-000',
          tipo: TipoEndereco.COMERCIAL,
        },
      },
    },
  });

  const curso = await prisma.curso.create({
    data: {
      nome: 'ADS',
      universidadeId: universidade.id,
    },
  });

  const disciplina = await prisma.disciplina.create({
    data: {
      nome: 'Programação Web',
      cursoId: curso.id,
    },
  });

  const professor = await prisma.professor.create({
    data: {
      nome: 'Professor GPT',
      email: 'prof.gpt@openai.com',
      endereco: {
        create: {
          logradouro: 'Rua Neural',
          numero: '7',
          bairro: 'IA Town',
          cidade: 'Campinas',
          estado: 'SP',
          cep: '13000-000',
          tipo: TipoEndereco.RESIDENCIAL,
        },
      },
      disciplinas: {
        create: {
          disciplinaId: disciplina.id,
        },
      },
    },
  });

  const turma = await prisma.turma.create({
    data: {
      nome: 'Turma A - Noite',
      cursoId: curso.id,
      professorId: professor.id,
      disciplinaId: disciplina.id,
    },
  });

  const aluno = await prisma.aluno.create({
    data: {
      nome: 'Diego Miotta',
      email: 'diego@pennacchi.com',
      senhaHash: 'hash123',
      cursoId: curso.id,
      endereco: {
        create: {
          logradouro: 'Rua do Código',
          numero: '123',
          bairro: 'Backend City',
          cidade: 'Ribeirão Preto',
          estado: 'SP',
          cep: '14000-000',
          tipo: TipoEndereco.RESIDENCIAL,
        },
      },
      turmas: {
        create: {
          turmaId: turma.id,
        },
      },
      permissoes: {
        create: [
          {
            permissao: {
              create: {
                nome: 'ALUNO_BASICO',
              },
            },
          },
        ],
      },
    },
  });

  console.log('✅ Dados inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao inserir dados: ', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
