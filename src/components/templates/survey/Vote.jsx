import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'

export default function Vote({ players, createSurveyVote }) {
  // Survey JSON
  const json = {
    completedHtml: `
      <style>
        .thanks-box {
          opacity: 0;
          animation: fadeIn 0.6s forwards;
          text-align: center;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .thanks-title {
          font-size: 26px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .thanks-title img {
          width: 30px;
          height: auto;
        }

        .thanks-subtitle {
          font-size: 16px;
          color: #aaa;
        }
      </style>

      <div class="thanks-box">
        <div class="thanks-title">
          <img src="/Futsal-for-her-logo.png" alt="Logo" />
          Danke für deine Stimme!
        </div>
        <div class="thanks-subtitle">
          Ihre Stimme wurde erfolgreich gespeichert.
        </div>
      </div>
    `,

    questions: [
      {
        type: 'radiogroup',
        titleLocation: 'hidden',
        name: 'bestPlayer',
        choices: players,
        isRequired: true,
        requiredErrorText: 'Bitte wähle eine Spielerin aus!'
      }
    ]
  }

  const survey = new Model(json)

  // Texto del botón
  survey.completeText = 'STIMME ABGEBEN'

  // Cuando se completa el voto
  survey.onComplete.add(sender => {
    const selectedId = sender.data.bestPlayer
    const selectedPlayer = players.find(p => p.value === selectedId)
    createSurveyVote(selectedPlayer)
  })

  return <Survey model={survey} />
}