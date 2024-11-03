import { FC } from 'react'

type ResultProps = {
  mbti: string
}

const Result: FC<ResultProps> = ({ mbti }) => (
  <div className="mt-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-center text-white shadow-lg">
    <h2 className="text-2xl font-bold">당신의 MBTI 유형</h2>
    <p className="mt-4 text-4xl font-extrabold">{mbti}</p>
    <p className="mt-2 text-sm">결과는 참고용으로만 사용해 주세요!</p>
  </div>
)

export default Result
