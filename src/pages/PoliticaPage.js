import React from 'react';
import '../pages/PoliticaPage.css'; 
import { Link } from 'react-router-dom';

function PoliticaPage({ appName, companyName, companyAddress, privacyEmail, privacyPhone }) {
  const Secao = ({ id, title, children }) => (
    <section className="secao" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="estrutura">
      <Secao id="introducao" title="1. Introdução">
        <p>
          Ao usar o TETEUFLIX, você concorda com a coleta, uso e divulgação de suas informações conforme descrito nesta Política de Privacidade.
        </p>
      </Secao>

      <Secao id="dados-que-coletamos" title="2. Que dados coletamos">
        <p>Coletamos informações para fornecer, manter e melhorar nossos serviços. Os dados podem incluir:</p>
        <div className="lista-dados">
          <p><strong>Dados de cadastro:</strong> nome, e-mail, data de nascimento, sexo, senha, preferências.</p>
          <p><strong>Dados de uso:</strong> logs de atividade, conteúdo assistido, pesquisas, interações.</p>
          <p><strong>Dados de pagamento:</strong> informações processadas por terceiros, conforme necessário.</p>
          <p><strong>Dados de dispositivo:</strong> tipo de dispositivo, sistema, IP, cookies.</p>
          <p><strong>Dados de localização:</strong> localização aproximada para conteúdo regional.</p>
          <p><strong>Conteúdo gerado pelo usuário:</strong> comentários, avaliações, mensagens.</p>
        </div>
      </Secao>

      <Secao id="como-coletamos" title="3. Como coletamos os dados">
        <div className="lista-dados">
          <p><strong>Diretamente:</strong> ao criar conta, atualizar perfil ou fazer compras.</p>
          <p><strong>Automatizado:</strong> cookies, logs, pixels durante uso do app.</p>
          <p><strong>De terceiros:</strong> quando permitido ou autorizado (pagamento, anúncios, análise).</p>
        </div>
      </Secao>

      <Secao id="finalidades" title="4. Finalidades do tratamento">
        <div className="lista-dados">
          <p>Fornecer e manter o serviço com personalização e segurança.</p>
          <p>Autenticar usuários e prevenir fraudes.</p>
          <p>Gerenciar pagamentos e comunicação com usuários.</p>
          <p>Melhorar experiência, realizar pesquisas e análises.</p>
        </div>
      </Secao>

      <Secao id="bases-legais" title="5. Bases legais para o tratamento">
        <p>O tratamento de dados é baseado nas seguintes bases legais:</p>
        <div className="lista-dados">
          <p><strong>Consentimento:</strong> você pode conceder ou revogar a qualquer momento.</p>
          <p><strong>Execução de contrato:</strong> para prestação dos serviços.</p>
          <p><strong>Obrigação legal:</strong> para cumprir exigências legais.</p>
          <p><strong>Interesse legítimo:</strong> segurança, melhoria e operação.</p>
          <p><strong>Proteção de interesses vitais:</strong> em situações emergenciais.</p>
        </div>
      </Secao>

      <Secao id="compartilhamento" title="6. Compartilhamento de dados">
        <p>Seus dados podem ser compartilhados com:</p>
        <div className="lista-dados">
          <p>Provedores de serviços (pagamento, suporte, hospedagem).</p>
          <p>Parceiros de conteúdo e licenciamento.</p>
          <p>Autoridades legais, se exigido por lei.</p>
          <p>Empresas envolvidas em fusão ou aquisição.</p>
        </div>
      </Secao>

      <Secao id="cookies" title="7. Cookies e tecnologias similares">
        <p>Usamos cookies para lembrar preferências, coletar estatísticas e personalizar conteúdo. Você pode desativá-los no navegador.</p>
      </Secao>

      <Secao id="seguranca" title="8. Segurança">
        <p>Adotamos medidas para proteger seus dados como criptografia, controle de acesso e boas práticas de segurança.</p>
      </Secao>

      <Secao id="retencao" title="9. Retenção de dados">
        <p>Seus dados são retidos conforme necessário para cumprir as finalidades informadas e obrigações legais.</p>
      </Secao>

      <Secao id="seus-direitos" title="10. Direitos do titular">
        <p>Você tem os seguintes direitos, conforme aplicável:</p>
        <div className="lista-dados">
          <p>Acesso aos seus dados.</p>
          <p>Correção de informações incorretas.</p>
          <p>Exclusão de dados, dentro dos limites legais.</p>
          <p>Portabilidade de dados.</p>
          <p>Restrição ou oposição ao tratamento.</p>
          <p>Revogação de consentimento.</p>
        </div>
        <p>Para exercer seus direitos, entre em contato conosco.</p>
      </Secao>

      <Secao id="transferencia-internacional" title="11. Transferência internacional de dados">
        <p>Seus dados podem ser transferidos para outros países com garantias de proteção, como cláusulas contratuais padrão.</p>
      </Secao>

      <Secao id="criancas" title="12. Crianças">
        <p>Nosso serviço não é direcionado a menores de 16 anos. Se coletarmos dados de menores sem consentimento, entre em contato conosco.</p>
      </Secao>

      <Secao id="alteracoes-politica" title="13. Alterações nesta Política">
        <p>Podemos atualizar esta política periodicamente. Recomendamos a revisão regular para estar ciente de mudanças.</p>
      </Secao>

      <Secao id="como-contatar" title="14. Como entrar em contato">
        <p>Para dúvidas ou solicitações:</p>
        <p><strong>Empresa: {companyName || 'Ifal Rio Largo'}</strong></p>
        <p><strong>Endereço: {companyAddress || 'Rio Largo - AL, 57100-000'}</strong></p>
        <p><strong>E-mail: {privacyEmail || 'ThiaguinhoDuguera@gmail.com'}</strong></p>
        <p><strong>Telefone: {privacyPhone || '(82) 2126-6290'}</strong></p>
      </Secao>

      <footer className="rodape" id="faq">
        <p>
          Este documento é um modelo. Adapte-o conforme necessário e consulte um profissional jurídico.
          <br />
          <Link to="/home">Clique aqui para voltar</Link>
        </p>
      </footer>
    </div>
  );
}

export default PoliticaPage;
