class CreateBloggers < ActiveRecord::Migration[5.0]
  def change
    create_table :bloggers do |t|
      t.string :title
      t.text :des
      t.text :reference

      t.timestamps
    end
  end
end
