FactoryBot.define do
  
  factory :message do
    body    { Faker::Lorem.sentence }
    image   { File.open("#{Rails.root}/spec/fixtures/sample.jpg") }
    group
    user
  end

end