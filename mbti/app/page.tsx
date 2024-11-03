'use client'
import { useState } from 'react'
import './globals.css'
import Question from './components/Question'
import Result from './components/Result'

type Question = {
  disagree: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
  agree: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
  text: string
}

const questions: Question[] = [
  {
    disagree: 'E',
    agree: 'I',
    text: '다이어트는 주변인의 시선보다는 자기만족을 위해 하는 거라고 생각한다.'
  },
  {
    disagree: 'S',
    agree: 'N',
    text: '다이어트에 성공한 미래의 내 모습을 상상해보면 동기부여가 된다.'
  },
  {
    disagree: 'T',
    agree: 'F',
    text: '살쪘다고 고민하는 친구들을 보면 나만 그런 게 아니구나 싶어 위로가 된다.'
  },
  {
    disagree: 'J',
    agree: 'P',
    text: '다이어트 방법을 고를 때 선택지가 다양한 편이 좋다.'
  },
  {
    disagree: 'E',
    agree: 'I',
    text: '사람이 붐비는 맛집에 가는 것보다 집에서 배달 음식을 시켜먹는 게 좋다.'
  },
  {
    disagree: 'S',
    agree: 'N',
    text: '다이어트를 할 때 세세한 식단 계획은 별로 중요하지 않다고 생각한다.'
  },
  {
    disagree: 'T',
    agree: 'F',
    text: '다이어트 중이지만 지인이 음식을 권하면 미안한 마음에 거절하기가 어렵다.'
  },
  {
    disagree: 'J',
    agree: 'P',
    text: '그때그때 즉흥적으로 끌리는 메뉴를 선택해서 식사하는 게 좋다.'
  }
]

export default function HomePage() {
  const [responses, setResponses] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [result, setResult] = useState<string>('')

  const handleSelect = (index: number, value: number) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  const calculateMBTI = () => {
    const scores: Record<
      'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P',
      number
    > = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0
    }

    responses.forEach((response, idx) => {
      const question = questions[idx]
      if (response === 0) {
        scores[question.disagree] += 2 // 매우 아니다
      } else if (response === 1) {
        scores[question.disagree] += 1 // 아니다
      } else if (response === 2) {
        // 보통이다는 점수 없음
      } else if (response === 3) {
        scores[question.agree] += 1 // 그렇다
      } else if (response === 4) {
        scores[question.agree] += 2 // 매우 그렇다
      }
    })

    let mbti = ''

    const determineType = (
      scoreA: number,
      scoreB: number,
      typeA: string,
      typeB: string
    ) => {
      if (scoreA >= scoreB) return typeA
      if (scoreA < scoreB) return typeB
      return typeB // 점수가 같을 경우
    }

    // E와 I 점수 비교
    mbti += determineType(scores.E, scores.I, 'E', 'I')

    // S와 N 점수 비교
    mbti += scores.S > scores.N ? 'S' : 'N' // S가 N보다 크면 S, 같으면 N

    // F와 T 점수 비교
    mbti += determineType(scores.F, scores.T, 'F', 'T')

    // P와 J 점수 비교
    mbti += determineType(scores.P, scores.J, 'P', 'J')

    setResult(mbti)
  }

  const isAllAnswered = responses.every(response => response !== null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">MBTI 설문</h1>
        {questions.map((question, idx) => (
          <Question
            key={idx}
            question={question}
            index={idx}
            selectedValue={responses[idx]}
            onSelect={handleSelect}
          />
        ))}
        <button
          onClick={calculateMBTI}
          disabled={!isAllAnswered}
          className={`mt-6 w-full rounded-md py-3 font-semibold text-white shadow-md transition duration-300 ${isAllAnswered ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-400'}`}>
          결과 확인
        </button>
        {result && <Result mbti={result} />}
      </div>
    </div>
  )
}
