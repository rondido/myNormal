import { FC } from 'react'

type QuestionProps = {
  question: {
    disagree: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
    agree: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
    text: string
  }
  index: number
  selectedValue: number | null
  onSelect: (index: number, value: number) => void
}

const Question: FC<QuestionProps> = ({
  question,
  index,
  selectedValue,
  onSelect
}) => {
  const options = [
    '매우 아니다',
    '아니다',
    '보통이다',
    '그렇다',
    '매우 그렇다'
  ] as const

  return (
    <div className="mb-6">
      <p className="mb-2 font-semibold">{question.text}</p>
      <div className="flex items-center space-x-4">
        {options.map((option, optionIdx) => (
          <label
            key={optionIdx}
            className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${index}`}
              value={optionIdx}
              checked={selectedValue === optionIdx}
              onChange={() => onSelect(index, optionIdx)}
              className="form-radio h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Question
